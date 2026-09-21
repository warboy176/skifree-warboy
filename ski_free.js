(() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // Canvas & constants
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d', { alpha: false });
  const statusEl = document.getElementById('status');
  const DPR_CAP = 2;
  const HUD_H = 54;
  const METERS_PER_PIXEL = 0.25;
  const MAX_SPEED = 420;
  const PlayerState = Object.freeze({IDLE:'IDLE',SKIING:'SKIING',JUMPING:'JUMPING',CRASHED:'CRASHED',EATEN:'EATEN'});
  const GameState = Object.freeze({START:'START',INTRO:'INTRO',PLAYING:'PLAYING',ENDING:'ENDING',GAMEOVER:'GAMEOVER',WON:'WON'});

  // NPC Skier constants
  const NPC_SKIER_SPEED = 200;
  const NPC_SKIER_WIDTH = 20;
  const NPC_SKIER_HEIGHT = 20;
  const NPC_SKIER_COLOR = '#ffcc00';

  // Game state
  const game = {
    state: GameState.START,
    player: null,
    obstacles: [],
    npcSkiers: [],
    deltaTime: 0,
    lastTime: 0,
    score: 0,
    speed: 0,
    lanes: [100, 200, 300, 400, 500], // x positions for skier lanes
  };

  // Input handling
  const pressed = new Set();
  const input = {
    pointer: false,
    pointerX: 0,
    pointerY: 0,
  };

  window.addEventListener('keydown', (e) => pressed.add(e.key));
  window.addEventListener('keyup', (e) => pressed.delete(e.key));

  canvas.addEventListener('mousedown', (e) => {
    input.pointer = true;
    const rect = canvas.getBoundingClientRect();
    input.pointerX = e.clientX - rect.left;
    input.pointerY = e.clientY - rect.top;
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    input.pointerX = e.clientX - rect.left;
    input.pointerY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseup', () => input.pointer = false);

  // Player class
  class Player {
    constructor() {
      this.x = 300;
      this.y = 400;
      this.width = 20;
      this.height = 20;
      this.state = PlayerState.IDLE;
      this.speed = 0;
      this.jumpTimer = 0;
      this.flipTimer = 0;
    }

    update(deltaTime) {
      if (this.state === PlayerState.CRASHED || this.state === PlayerState.EATEN) return;

      // Handle input
      if (pressed.has('ArrowLeft') || pressed.has('a')) {
        this.x = Math.max(0, this.x - 200 * deltaTime);
      }
      if (pressed.has('ArrowRight') || pressed.has('d')) {
        this.x = Math.min(580, this.x + 200 * deltaTime);
      }

      // Jumping
      if ((pressed.has(' ') || input.pointer) && this.state !== PlayerState.JUMPING) {
        this.state = PlayerState.JUMPING;
        this.jumpTimer = 0.5;
      }

      // Flip in air
      if (this.state === PlayerState.JUMPING && pressed.has('ArrowUp')) {
        this.flipTimer = 0.3;
      }

      // Update jump
      if (this.state === PlayerState.JUMPING) {
        this.jumpTimer -= deltaTime;
        if (this.jumpTimer <= 0) {
          this.state = PlayerState.SKIING;
        }
      }

      // Update flip
      if (this.flipTimer > 0) {
        this.flipTimer -= deltaTime;
      }
    }

    draw() {
      ctx.fillStyle = '#123c69';
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // Draw skier details
      ctx.fillStyle = '#e33232';
      ctx.fillRect(this.x + 5, this.y + 5, 10, 10);
    }
  }

  // NPC Skier class
  class NPCSkier {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = NPC_SKIER_WIDTH;
      this.height = NPC_SKIER_HEIGHT;
      this.speed = NPC_SKIER_SPEED;
      this.color = NPC_SKIER_COLOR;
    }

    update(deltaTime) {
      this.y += this.speed * deltaTime;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // Draw skier details
      ctx.fillStyle = '#102a43';
      ctx.fillRect(this.x + 5, this.y + 5, 10, 10);
    }
  }

  // Intro state handling
  let introShown = false;
  function showIntro() {
    if (introShown) return;
    introShown = true;
    statusEl.textContent = 'Press Enter or tap to start your descent.';
    game.state = GameState.INTRO;
  }

  function handleIntroInput() {
    if (pressed.has('Enter') || input.pointer) {
      game.state = GameState.PLAYING;
      statusEl.textContent = '';
    }
  }

  // Spawn NPC skiers
  function spawnNPCSkiers() {
    if (game.npcSkiers.length < 5) {
      const lane = game.lanes[Math.floor(Math.random() * game.lanes.length)];
      const skier = new NPCSkier(lane, -NPC_SKIER_HEIGHT);
      game.npcSkiers.push(skier);
    }
  }

  // Game loop
  function gameLoop(timestamp) {
    if (!game.lastTime) game.lastTime = timestamp;
    game.deltaTime = Math.min(0.1, (timestamp - game.lastTime) / 1000);
    game.lastTime = timestamp;

    // Clear canvas
    ctx.fillStyle = '#b7e4f4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (game.state === GameState.START) {
      showIntro();
    } else if (game.state === GameState.INTRO) {
      handleIntroInput();
    } else if (game.state === GameState.PLAYING) {
      // Initialize player if needed
      if (!game.player) {
        game.player = new Player();
      }

      // Update player
      game.player.update(game.deltaTime);

      // Spawn NPC skiers
      spawnNPCSkiers();

      // Update and draw NPC skiers
      game.npcSkiers.forEach((skier, index) => {
        skier.update(game.deltaTime);
        skier.draw();

        // Remove skiers that are off screen
        if (skier.y > canvas.height) {
          game.npcSkiers.splice(index, 1);
        }
      });

      // Draw player
      game.player.draw();

      // Update score
      game.score += Math.floor(game.deltaTime * 100);
    }

    requestAnimationFrame(gameLoop);
  }

  // Initialize canvas size
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio, DPR_CAP);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = (canvas.clientHeight - HUD_H) * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Start game loop
  requestAnimationFrame(gameLoop);
})();
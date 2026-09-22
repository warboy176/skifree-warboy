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
    npcSkiers: [],
    deltaTime: 0,
    lastTime: 0,
    keys: new Set(),
    input: { pointer: false },
    lanes: [100, 200, 300, 400, 500], // Lane positions
    score: 0,
    speed: 0
  };

  // Input handling
  const pressed = new Set();
  
  document.addEventListener('keydown', (e) => {
    pressed.add(e.key);
    if (e.key === 'Enter' && game.state !== GameState.PLAYING) {
      e.preventDefault();
      if (game.state === GameState.START || game.state === GameState.INTRO) {
        game.state = GameState.PLAYING;
        statusEl.textContent = '';
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    pressed.delete(e.key);
  });

  canvas.addEventListener('pointerdown', () => {
    game.input.pointer = true;
  });

  canvas.addEventListener('pointerup', () => {
    game.input.pointer = false;
  });

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

    update() {
      this.y += this.speed * game.deltaTime;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  // Spawn NPC skiers
  function spawnNPCSkiers() {
    if (game.npcSkiers.length < 5) { // Limit to 5 at a time
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
      // Update and draw NPC skiers
      spawnNPCSkiers();
      game.npcSkiers.forEach((skier, index) => {
        skier.update();
        skier.draw();
        
        // Remove skiers that are off screen
        if (skier.y > canvas.height) {
          game.npcSkiers.splice(index, 1);
        }
      });
    }

    requestAnimationFrame(gameLoop);
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
    if (pressed.has('Enter') || game.input.pointer) {
      game.state = GameState.PLAYING;
      statusEl.textContent = '';
    }
  }

  // Initialize canvas
  function initCanvas() {
    const dpr = Math.min(window.devicePixelRatio, DPR_CAP);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = (canvas.clientHeight - HUD_H) * dpr;
    ctx.scale(dpr, dpr);
  }

  // Initialize game
  function init() {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    requestAnimationFrame(gameLoop);
  }

  // Start the game
  init();
})();
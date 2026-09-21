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
    deltaTime: 0,
    lastTime: 0,
    npcSkiers: [],
    player: null,
    lanes: []
  };

  // Lane positions
  const laneX = [100, 200, 300, 400, 500];

  // SKI_COLORS array (assuming this was missing)
  const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  // Input handling
  const pressed = new Set();
  const input = {
    pointer: false,
    x: 0,
    y: 0
  };

  window.addEventListener('keydown', (e) => pressed.add(e.key));
  window.addEventListener('keyup', (e) => pressed.delete(e.key));

  canvas.addEventListener('mousedown', (e) => {
    input.pointer = true;
    const rect = canvas.getBoundingClientRect();
    input.x = e.clientX - rect.left;
    input.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (input.pointer) {
      const rect = canvas.getBoundingClientRect();
      input.x = e.clientX - rect.left;
      input.y = e.clientY - rect.top;
    }
  });

  canvas.addEventListener('mouseup', () => {
    input.pointer = false;
  });

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

  // NPC Skier class
  class NPCSkier {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speed = NPC_SKIER_SPEED;
      this.color = NPC_SKIER_COLOR;
    }

    update() {
      this.y += this.speed * game.deltaTime;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, NPC_SKIER_WIDTH, NPC_SKIER_HEIGHT);
    }
  }

  // Spawn NPC skiers
  function spawnNPCSkiers() {
    if (game.npcSkiers.length < 5) {
      const x = laneX[Math.floor(Math.random() * laneX.length)];
      const y = -NPC_SKIER_HEIGHT;
      const color = SKI_COLORS[Math.floor(Math.random() * SKI_COLORS.length)];
      const skier = new NPCSkier(x, y);
      skier.color = color;
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
      // Spawn NPC skiers
      spawnNPCSkiers();

      // Update and draw NPC skiers
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

  // Initialize canvas
  function initCanvas() {
    const dpr = Math.min(window.devicePixelRatio, DPR_CAP);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = (canvas.clientHeight - HUD_H) * dpr;
    ctx.scale(dpr, dpr);
  }

  // Start the game
  window.addEventListener('load', () => {
    initCanvas();
    requestAnimationFrame(gameLoop);
  });

  // Autoplayer logic
  let autoplay = {
    enabled: new URLSearchParams(window.location.search).get('demo') === '1',
    simulateKeyPress: function(key) {
      const event = new KeyboardEvent('keydown', { code: key, key: key, repeat: false });
      document.dispatchEvent(event);
      setTimeout(() => {
        const upEvent = new KeyboardEvent('keyup', { code: key, key: key });
        document.dispatchEvent(upEvent);
      }, 100);
    },
    run: function() {
      if (!autoplay.enabled) return;

      // Simple autoplay logic - move left/right based on player position
      const playerX = 300; // Assuming player starts in center lane
      const npcSkiersInLane = game.npcSkiers.filter(skier => 
        Math.abs(skier.x - playerX) < 50
      );

      if (npcSkiersInLane.length > 0) {
        // If there's an NPC skier in the same lane, move to avoid collision
        this.simulateKeyPress('ArrowRight');
      } else {
        // Otherwise, move randomly
        if (Math.random() > 0.7) {
          this.simulateKeyPress(Math.random() > 0.5 ? 'ArrowLeft' : 'ArrowRight');
        }
      }
    }
  };

  // Run autoplay if enabled
  if (autoplay.enabled) {
    setInterval(autoplay.run, 1000);
  }
})();
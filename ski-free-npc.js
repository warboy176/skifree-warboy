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
    player: null
  };

  // Lane positions
  const laneX = [100, 200, 300, 400, 500];
  const SKI_COLORS = ['#ffcc00', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

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
    const rect = canvas.getBoundingClientRect();
    input.x = e.clientX - rect.left;
    input.y = e.clientY - rect.top;
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
      
      // Draw skier details
      ctx.fillStyle = '#000';
      ctx.fillRect(this.x + 5, this.y + 5, 3, 3); // Eye
      ctx.fillRect(this.x + 12, this.y + 5, 3, 3); // Eye
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

    if (game.state === GameState.START) {
      showIntro();
    } else if (game.state === GameState.INTRO) {
      handleIntroInput();
    } else if (game.state === GameState.PLAYING) {
      // Spawn new NPC skiers
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
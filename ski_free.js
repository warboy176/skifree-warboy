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
    pointer: false,
    speed: 0,
    score: 0,
    time: 0
  };

  // Input handling
  const pressed = new Set();
  window.addEventListener('keydown', e => pressed.add(e.key));
  window.addEventListener('keyup', e => pressed.delete(e.key));
  canvas.addEventListener('pointerdown', () => game.pointer = true);
  canvas.addEventListener('pointerup', () => game.pointer = false);

  // Lane positions
  const laneX = [100, 200, 300, 400];
  
  // Ski colors
  const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  // Intro state handling
  let introShown = false;
  function showIntro() {
    if (introShown) return;
    introShown = true;
    statusEl.textContent = 'Press Enter or tap to start your descent.';
    game.state = GameState.INTRO;
  }

  function handleIntroInput() {
    if (pressed.has('Enter') || game.pointer) {
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
    if (game.lastTime === 0) game.lastTime = timestamp;
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
      game.npcSkiers.forEach(skier => {
        skier.update();
        skier.draw();
      });
      
      // Remove off-screen skiers
      game.npcSkiers = game.npcSkiers.filter(skier => skier.y < canvas.height);
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

  // Start game
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
      
      // Simple autoplay logic
      if (game.state === GameState.PLAYING && game.npcSkiers.length > 0) {
        const nearestSkier = game.npcSkiers.reduce((nearest, skier) => {
          return skier.y > nearest.y ? skier : nearest;
        });
        
        if (nearestSkier.x < 200) {
          autoplay.simulateKeyPress('ArrowLeft');
        } else if (nearestSkier.x > 300) {
          autoplay.simulateKeyPress('ArrowRight');
        }
      }
    }
  };

  // Run autoplay
  setInterval(autoplay.run, 500);
})();
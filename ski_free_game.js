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
  
  // Game object initialization
  const game = {
    state: GameState.START,
    deltaTime: 0,
    lastTime: 0,
    npcSkiers: [],
    player: null,
    lanes: [],
    score: 0,
    speed: 0
  };

  // Lane positions
  const laneX = [100, 200, 300, 400, 500];
  
  // Ski colors
  const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  // Input handling
  const pressed = new Set();
  const input = {
    pointer: false,
    mouseX: 0,
    mouseY: 0
  };

  window.addEventListener('keydown', (e) => pressed.add(e.key));
  window.addEventListener('keyup', (e) => pressed.delete(e.key));
  
  canvas.addEventListener('mousedown', () => input.pointer = true);
  canvas.addEventListener('mouseup', () => input.pointer = false);
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    input.mouseX = e.clientX - rect.left;
    input.mouseY = e.clientY - rect.top;
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

  // Player class
  class Player {
    constructor() {
      this.x = 300;
      this.y = 400;
      this.width = 20;
      this.height = 20;
      this.state = PlayerState.IDLE;
      this.speed = 0;
      this.lane = 2; // Start in center lane
    }

    update() {
      if (game.state !== GameState.PLAYING) return;
      
      // Handle input
      if (pressed.has('ArrowLeft') && this.lane > 0) {
        this.lane--;
      } else if (pressed.has('ArrowRight') && this.lane < laneX.length - 1) {
        this.lane++;
      }
      
      // Update position based on lane
      this.x = laneX[this.lane] - this.width/2;
      
      // Handle jumping
      if (pressed.has(' ') && this.state !== PlayerState.JUMPING) {
        this.state = PlayerState.JUMPING;
        this.speed = -300; // Jump up
      }
      
      // Apply gravity
      if (this.state === PlayerState.JUMPING) {
        this.y += this.speed * game.deltaTime;
        this.speed += 500 * game.deltaTime; // Gravity
        
        // Land
        if (this.y > 400) {
          this.y = 400;
          this.state = PlayerState.SKIING;
        }
      }
    }

    draw() {
      ctx.fillStyle = '#0000ff';
      ctx.fillRect(this.x, this.y, this.width, this.height);
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
    if (game.state !== GameState.PLAYING) return;
    
    const numNPCs = 5;
    for (let i = 0; i < numNPCs; i++) {
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
    ctx.fillStyle = '#87CEEB';
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
      
      // Update and draw player
      game.player.update();
      game.player.draw();
      
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

  // Initialize canvas size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, DPR_CAP);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  // Start the game
  window.addEventListener('load', () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(gameLoop);
  });
})();
(() => {
  // Constants
  const GameState = { START: 'start', INTRO: 'intro', PLAYING: 'playing' };
  const PlayerState = { SKIING: 'skiing', JUMPING: 'jumping', CRASHED: 'crashed', EATEN: 'eaten' };
  const DPR_CAP = 2;

  // Canvas setup
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const statusEl = document.getElementById('status');

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

  // Lane positions
  const laneX = [100, 200, 300, 400, 500];
  const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

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
    game.pointer = true;
  });

  canvas.addEventListener('pointerup', () => {
    game.pointer = false;
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
    if (pressed.has('Enter') || game.pointer) {
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
      this.state = PlayerState.SKIING;
      this.speed = 0;
      this.lane = 2; // Start in center lane
    }

    update() {
      if (this.state === PlayerState.CRASHED || this.state === PlayerState.EATEN) return;

      // Handle input
      if (pressed.has('ArrowLeft') && this.lane > 0) {
        this.lane--;
      }
      if (pressed.has('ArrowRight') && this.lane < laneX.length - 1) {
        this.lane++;
      }
      
      // Update position based on lane
      this.x = laneX[this.lane] - this.width/2;

      // Handle jumping
      if (pressed.has(' ') && this.state === PlayerState.SKIING) {
        this.state = PlayerState.JUMPING;
        this.speed = -300; // Jump up
      }

      // Update jump physics
      if (this.state === PlayerState.JUMPING) {
        this.y += this.speed * game.deltaTime;
        this.speed += 500 * game.deltaTime; // Gravity
        
        // Land back on ground
        if (this.y > 400) {
          this.y = 400;
          this.state = PlayerState.SKIING;
        }
      }
    }

    draw() {
      ctx.fillStyle = '#123c69';
      ctx.fillRect(this.x, this.y, this.width, this.height);
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
      game.player.update();
      
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
      
      // Draw player
      game.player.draw();
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

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Start game loop
  requestAnimationFrame(gameLoop);
})();
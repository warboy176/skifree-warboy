const NPC_SKIER_WIDTH = 20;
const NPC_SKIER_HEIGHT = 20;
const NPC_SKIER_SPEED = 150; // pixels per second
const NPC_SKIER_COLOR = '#000';

// Lane positions
const laneX = [100, 200, 300, 400];

// Game state
const GameState = {
  START: 0,
  INTRO: 1,
  PLAYING: 2,
  PAUSED: 3,
  GAME_OVER: 4
};

// Ski colors
const SKI_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

// Game object
const game = {
  state: GameState.START,
  lastTime: 0,
  deltaTime: 0,
  player: null,
  obstacles: [],
  npcSkiers: []
};

// Canvas setup
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const statusEl = document.getElementById('status');

// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.color = '#000';
    this.lane = 1; // Start in middle lane
  }

  update() {
    // Player movement logic would go here
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details
    ctx.fillStyle = '#FFF';
    ctx.fillRect(this.x + 4, this.y + 4, 3, 3); // Eye
    ctx.fillRect(this.x + 13, this.y + 4, 3, 3); // Eye
  }
}

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = NPC_SKIER_SPEED;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.color = NPC_SKIER_COLOR;
    this.lane = 0;
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 4, this.y + 4, 3, 3); // Eye
    ctx.fillRect(this.x + 13, this.y + 4, 3, 3); // Eye
  }
}

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
    if (!autoplay.enabled || game.state !== GameState.PLAYING) return;
    
    // Simple AI to avoid obstacles
    const player = game.player;
    const nearestObstacle = game.obstacles.find(obs => obs.y > player.y - 100 && obs.y < player.y + 100);
    
    if (nearestObstacle) {
      if (nearestObstacle.x < player.x) {
        this.simulateKeyPress('ArrowLeft');
      } else if (nearestObstacle.x > player.x) {
        this.simulateKeyPress('ArrowRight');
      }
    }
    
    // Jump when about to hit an obstacle
    if (nearestObstacle && Math.abs(nearestObstacle.y - player.y) < 30 && nearestObstacle.x === player.x) {
      this.simulateKeyPress(' '); // Spacebar for jump
    }
  }
};

// Show intro screen
function showIntro() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#FFF';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SKI FREE', canvas.width / 2, canvas.height / 2 - 50);
  
  ctx.font = '16px Arial';
  ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2);
}

// Handle intro input
function handleIntroInput() {
  // Input handling would go here
}

// Game loop
function gameLoop(timestamp) {
  if (game.lastTime === 0) {
    game.lastTime = timestamp;
  }
  
  game.deltaTime = Math.min(0.1, (timestamp - game.lastTime) / 1000);
  game.lastTime = timestamp;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (game.state === GameState.START) {
    showIntro();
  } else if (game.state === GameState.INTRO) {
    handleIntroInput();
  } else if (game.state === GameState.PLAYING) {
    // Update and draw NPC skiers
    spawnNPCSkiers();
    game.npcSkiers.forEach(skier => {
      skier.update();
      skier.draw();
    });
    
    // Remove off-screen NPC skiers
    game.npcSkiers = game.npcSkiers.filter(skier => skier.y < canvas.height);
    
    // Autoplayer
    autoplay.run();
  }
  
  requestAnimationFrame(gameLoop);
}

// Start the game
requestAnimationFrame(gameLoop);
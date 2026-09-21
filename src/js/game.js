// Game state management
const GameState = {
  START: 'start',
  INTRO: 'intro',
  PLAYING: 'playing'
};

// Game constants
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const LANE_WIDTH = CANVAS_WIDTH / 3;
const SKIER_WIDTH = 20;
const SKIER_HEIGHT = 30;
const SKIER_SPEED = 200;
const NPC_SKIER_WIDTH = 20;
const NPC_SKIER_HEIGHT = 30;
const NPC_SKIER_SPEED = 150;
const NPC_SKIER_COLOR = '#0000FF';
const SKI_COLORS = ['#FF0000', '#00FF00', '#FFFF00', '#FF00FF'];

// Game object
const game = {
  state: GameState.START,
  skier: null,
  npcSkiers: [],
  lastTime: 0,
  deltaTime: 0
};

// Lane positions
const laneX = [
  LANE_WIDTH / 2 - SKIER_WIDTH / 2,
  LANE_WIDTH + LANE_WIDTH / 2 - SKIER_WIDTH / 2,
  LANE_WIDTH * 2 + LANE_WIDTH / 2 - SKIER_WIDTH / 2
];

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Show intro screen
function showIntro() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SKI FREE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
  
  ctx.font = '16px Arial';
  ctx.fillText('Press ENTER or click to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
}

// Handle intro input
function handleIntroInput() {
  if (Input.isPressed('Enter') || Input.pointer) {
    game.state = GameState.PLAYING;
    // Initialize player skier
    game.skier = new Skier(CANVAS_WIDTH / 2 - SKIER_WIDTH / 2, CANVAS_HEIGHT - 100);
    statusEl.textContent = '';
  }
}

// Game loop
function gameLoop(timestamp) {
  // Calculate delta time
  if (game.lastTime === 0) {
    game.lastTime = timestamp;
  }
  game.deltaTime = (timestamp - game.lastTime) / 1000;
  game.lastTime = timestamp;
  
  // Clear canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  if (game.state === GameState.START) {
    showIntro();
  } else if (game.state === GameState.INTRO) {
    handleIntroInput();
  } else if (game.state === GameState.PLAYING) {
    // Update and draw player skier
    if (game.skier) {
      game.skier.update();
      game.skier.draw();
    }
    
    // Spawn NPC skiers
    spawnNPCSkiers();
    
    // Update and draw NPC skiers
    game.npcSkiers.forEach(skier => {
      skier.update();
      skier.draw();
    });
    
    // Remove off-screen NPC skiers
    game.npcSkiers = game.npcSkiers.filter(skier => skier.y < CANVAS_HEIGHT);
  }
  
  requestAnimationFrame(gameLoop);
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
    
    // Draw skis
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x - 2, this.y + this.height, this.width + 4, 3);
  }
}

// Spawn NPC skiers
function spawnNPCSkiers() {
  // Only spawn if we don't have too many
  if (game.npcSkiers.length < 5) {
    const x = laneX[Math.floor(Math.random() * laneX.length)];
    const y = -NPC_SKIER_HEIGHT;
    const color = SKI_COLORS[Math.floor(Math.random() * SKI_COLORS.length)];
    const skier = new NPCSkier(x, y);
    skier.color = color;
    game.npcSkiers.push(skier);
  }
}

// Start the game loop
requestAnimationFrame(gameLoop);
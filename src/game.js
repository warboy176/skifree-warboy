const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const LANE_COUNT = 3;
const LANE_WIDTH = GAME_WIDTH / LANE_COUNT;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 60;
const NPC_SKIER_WIDTH = 40;
const NPC_SKIER_HEIGHT = 60;
const NPC_SKIER_SPEED = 150;
const NPC_SKIER_COLOR = '#FF6347'; // Tomato color for NPCs

let game = {
  state: 'MENU', // MENU, PLAYING, GAME_OVER
  player: null,
  npcSkiers: [],
  score: 0,
  deltaTime: 0,
  lastTime: 0,
  keys: {}
};

// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = 200;
    this.lane = 1; // Start in center lane
  }

  update(deltaTime) {
    // Handle input
    if (game.keys['ArrowLeft'] && this.lane > 0) {
      this.lane--;
    }
    if (game.keys['ArrowRight'] && this.lane < LANE_COUNT - 1) {
      this.lane++;
    }

    // Move to target lane
    const targetX = this.lane * LANE_WIDTH + (LANE_WIDTH - this.width) / 2;
    this.x += (targetX - this.x) * 0.1;
  }

  draw() {
    ctx.fillStyle = '#FFD700'; // Gold color for player
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// NPC Skier class
class NPCEntity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = NPC_SKIER_SPEED + Math.random() * 50; // Random speed
    this.color = NPC_SKIER_COLOR;
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skis
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x - 2, this.y + this.height, this.width + 4, 5);
  }
}

// Initialize game
function initGame() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  
  game.player = new Player(LANE_WIDTH + (LANE_WIDTH - PLAYER_WIDTH) / 2, GAME_HEIGHT - 100);
  game.npcSkiers = [];
  game.score = 0;
  game.lastTime = performance.now();
}

// Spawn NPC skiers
function spawnNPCSkiers() {
  const lane = Math.floor(Math.random() * LANE_COUNT);
  const x = lane * LANE_WIDTH + (LANE_WIDTH - NPC_SKIER_WIDTH) / 2;
  
  game.npcSkiers.push(new NPCEntity(x, -NPC_SKIER_HEIGHT));
}

// Game loop
function gameLoop(timestamp) {
  const deltaTime = (timestamp - game.lastTime) / 1000;
  game.deltaTime = Math.min(deltaTime, 0.05); // Cap delta time
  game.lastTime = timestamp;

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

function update() {
  if (game.state === 'PLAYING') {
    game.player.update(game.deltaTime);
    
    // Spawn NPC skiers
    if (Math.random() < 0.02) { // 2% chance per frame
      spawnNPCSkiers();
    }
    
    // Update NPC skiers
    game.npcSkiers.forEach((skier, index) => {
      skier.update();
      
      // Remove skiers that are off screen
      if (skier.y > GAME_HEIGHT) {
        game.npcSkiers.splice(index, 1);
        game.score += 10; // Add score for avoiding skiers
      }
    });
    
    // Simple collision detection
    game.npcSkiers.forEach(skier => {
      if (
        game.player.x < skier.x + NPC_SKIER_WIDTH &&
        game.player.x + PLAYER_WIDTH > skier.x &&
        game.player.y < skier.y + NPC_SKIER_HEIGHT &&
        game.player.y + PLAYER_HEIGHT > skier.y
      ) {
        // Collision detected
        gameOver();
      }
    });
  }
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  if (game.state === 'PLAYING') {
    // Draw player
    game.player.draw();
    
    // Draw NPC skiers
    game.npcSkiers.forEach(skier => {
      skier.draw();
    });
    
    // Draw score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${game.score}`, 10, 30);
  }
}

function startGame() {
  game.state = 'PLAYING';
  initGame();
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  game.state = 'GAME_OVER';
  // Show game over screen
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
  
  ctx.font = '20px Arial';
  ctx.fillText(`Final Score: ${game.score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
  
  ctx.textAlign = 'left';
}

// Event listeners
window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  game.keys[e.key] = false;
});

// Start the game when page loads
window.onload = function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  startGame();
};
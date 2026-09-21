const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 50;
const PLAYER_SPEED = 200;
const PLAYER_COLOR = '#FF0000'; // Red
const JUMP_SPEED = 400;

const NPC_SKIER_WIDTH = 30;
const NPC_SKIER_HEIGHT = 50;
const NPC_SKIER_SPEED = 150;
const NPC_SKIER_COLOR = '#0000FF'; // Blue

const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 40;
const OBSTACLE_SPEED = 200;
const OBSTACLE_TYPES = ['tree', 'rock', 'log'];

// Game state
const game = {
  player: null,
  npcSkiers: [],
  obstacles: [],
  score: 0,
  deltaTime: 0,
  lastTime: 0,
};

// Lane positions
const laneX = [canvas.width / 4, canvas.width / 2, 3 * canvas.width / 4];

// Input handling
const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Initialize game
function init() {
  game.player = new Player(laneX[1] - PLAYER_WIDTH / 2, canvas.height - PLAYER_HEIGHT - 20);
  game.lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop(timestamp) {
  // Calculate delta time
  game.deltaTime = (timestamp - game.lastTime) / 1000;
  game.lastTime = timestamp;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw player
  game.player.update();
  game.player.draw();

  // Spawn NPC skiers and obstacles
  spawnNPCSkiers();
  spawnObstacles();

  // Update and draw NPC skiers
  game.npcSkiers.forEach(skier => {
    skier.update();
    skier.draw();
  });

  // Update and draw obstacles
  game.obstacles.forEach(obstacle => {
    obstacle.update();
    obstacle.draw();
  });

  // Check collisions
  checkCollisions();

  // Continue game loop
  requestAnimationFrame(gameLoop);
}

function checkCollisions() {
  // Player with obstacles
  game.obstacles.forEach(obstacle => {
    if (game.player.checkCollision(obstacle)) {
      gameOver();
    }
  });

  // Player with NPC skiers
  game.npcSkiers.forEach(skier => {
    if (game.player.checkCollision(skier)) {
      gameOver();
    }
  });
}

function gameOver() {
  alert(`Game Over! Your score: ${game.score}`);
  location.reload(); // Restart the game
}

// Start the game
init();
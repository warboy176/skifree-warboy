const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 50;
const PLAYER_SPEED = 200;
const JUMP_SPEED = 400;
const JUMP_MAX_HEIGHT = 100;
const NPC_SKIER_WIDTH = 30;
const NPC_SKIER_HEIGHT = 50;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 40;

const PLAYER_COLOR = '#FF0000';
const NPC_SKIER_COLOR = '#0000FF';
const OBSTACLE_COLORS = {
  tree: '#228B22',
  rock: '#808080',
  snowball: '#FFFFFF'
};

const OBSTACLE_TYPES = ['tree', 'rock', 'snowball'];

const laneX = [50, 150, 250]; // X positions for the three lanes

let game = new Game();
let keys = {};

// Handle keyboard input
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Game loop
function gameLoop(timestamp) {
  if (!game.lastTime) game.lastTime = timestamp;
  game.deltaTime = (timestamp - game.lastTime) / 1000;
  game.lastTime = timestamp;

  game.update();
  game.draw();

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
// Player skier logic
const PLAYER_SKIER_SPEED = 200; // pixels per second
const PLAYER_SKIER_WIDTH = 20;
const PLAYER_SKIER_HEIGHT = 30;
const PLAYER_LANE_POSITIONS = [100, 200, 300, 400]; // Lane positions

let player = {
  x: PLAYER_LANE_POSITIONS[1], // Start in the middle lane
  y: 500,
  speed: PLAYER_SKIER_SPEED,
  currentLane: 1,
};

export function updatePlayer() {
  if (game.state !== GameState.PLAYING) return;

  // Move player based on input
  if (keys['ArrowLeft'] && player.currentLane > 0) {
    player.currentLane--;
  } else if (keys['ArrowRight'] && player.currentLane < PLAYER_LANE_POSITIONS.length - 1) {
    player.currentLane++;
  }

  // Update x position based on lane
  player.x = PLAYER_LANE_POSITIONS[player.currentLane];
}

export function drawPlayer() {
  ctx.fillStyle = '#000000'; // Black skier
  ctx.fillRect(player.x, player.y, PLAYER_SKIER_WIDTH, PLAYER_SKIER_HEIGHT);
}

// Handle keyboard input
const keys = {};

function handleKeyDown(event) {
  keys[event.key] = true;
}

function handleKeyUp(event) {
  keys[event.key] = false;
}

// Add event listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

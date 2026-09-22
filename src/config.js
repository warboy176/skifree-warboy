// Game configuration constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Player constants
const PLAYER_COLOR = '#0000FF';
const JUMP_SPEED = 300;
const JUMP_MAX_HEIGHT = 150;

// NPC Skier constants
const NPC_SKIER_WIDTH = 30;
const NPC_SKIER_HEIGHT = 60;
const NPC_SKIER_COLOR = '#FF0000';
const NPC_SKIER_SPEED = 200;

// Obstacle constants
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 40;
const OBSTACLE_COLOR = '#8B4513';
const OBSTACLE_TYPES = ['tree', 'rock', 'box'];
const OBSTACLE_SPEED = 250;

// Lane positions
const LANE_COUNT = 3;
const LANE_WIDTH = CANVAS_WIDTH / LANE_COUNT;
const laneX = [
  LANE_WIDTH / 2 - NPC_SKIER_WIDTH / 2, // Left lane
  LANE_WIDTH * 1.5 - NPC_SKIER_WIDTH / 2, // Middle lane
  LANE_WIDTH * 2.5 - NPC_SKIER_WIDTH / 2  // Right lane
];

// Game states
const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver'
};

// Export constants for use in other files
export { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  PLAYER_COLOR, 
  JUMP_SPEED, 
  JUMP_MAX_HEIGHT, 
  NPC_SKIER_WIDTH, 
  NPC_SKIER_HEIGHT, 
  NPC_SKIER_COLOR, 
  NPC_SKIER_SPEED, 
  OBSTACLE_WIDTH, 
  OBSTACLE_HEIGHT, 
  OBSTACLE_COLOR, 
  OBSTACLE_TYPES, 
  OBSTACLE_SPEED, 
  LANE_COUNT, 
  LANE_WIDTH, 
  laneX, 
  GameState 
};
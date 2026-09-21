// Game configuration
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 200;
const PLAYER_COLOR = '#0000FF';
const JUMP_SPEED = 400;

const NPC_SKIER_WIDTH = 30;
const NPC_SKIER_HEIGHT = 30;
const NPC_SKIER_SPEED = 150;
const NPC_SKIER_COLOR = '#FF0000';

const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 30;
const OBSTACLE_TYPES = ['tree', 'rock', 'log'];
const OBSTACLE_COLORS = {
  tree: '#8B4513',
  rock: '#A9A9A9',
  log: '#8B4513'
};

const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAME_OVER: 'game_over'
};
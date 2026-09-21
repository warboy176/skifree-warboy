const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 40;
const PLAYER_SPEED = 200;
const JUMP_SPEED = 400;
const JUMP_MAX_HEIGHT = 80;

const NPC_SKIER_WIDTH = 30;
const NPC_SKIER_HEIGHT = 40;
const NPC_SKIER_SPEED = 150;

const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 30;
const OBSTACLE_SPEED = 200;

const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAME_OVER: 'game_over'
};

const game = {
  player: null,
  npcSkiers: [],
  obstacles: [],
  state: GameState.MENU,
  lastTime: null,
  deltaTime: 0,
  score: 0,
  highScore: 0
};

// Spawn NPC skiers randomly
function spawnNPCSkiers() {
  if (Math.random() < 0.02) { // 2% chance per frame
    const lane = Math.floor(Math.random() * 3);
    game.npcSkiers.push(new NPCSkier(laneX[lane], -NPC_SKIER_HEIGHT));
  }
}

// Spawn obstacles randomly
function spawnObstacles() {
  if (Math.random() < 0.01) { // 1% chance per frame
    const lane = Math.floor(Math.random() * 3);
    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    game.obstacles.push(new Obstacle(laneX[lane], -OBSTACLE_HEIGHT, type));
  }
}
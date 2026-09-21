// Game variables
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let game = {
  state: GameState.MENU,
  player: null,
  npcSkiers: [],
  obstacles: [],
  score: 0,
  deltaTime: 0,
  lastTime: 0,
  laneX: [100, 300, 500], // X positions for three lanes
  keys: {}
};

// Initialize game
function init() {
  game.player = new Player(game.laneX[1], canvas.height - 100); // Start in center lane
  game.npcSkiers = [];
  game.obstacles = [];
  game.score = 0;
  game.state = GameState.PLAYING;
}

// Game loop
function gameLoop(timestamp) {
  if (!game.lastTime) game.lastTime = timestamp;
  game.deltaTime = (timestamp - game.lastTime) / 1000; // Convert to seconds
  game.lastTime = timestamp;

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

function update() {
  if (game.state !== GameState.PLAYING) return;

  // Update player
  game.player.update();

  // Update NPC skiers
  for (let i = game.npcSkiers.length - 1; i >= 0; i--) {
    game.npcSkiers[i].update();
    
    // Remove NPC skiers that are off screen
    if (game.npcSkiers[i].y > canvas.height) {
      game.npcSkiers.splice(i, 1);
    }
  }

  // Update obstacles
  for (let i = game.obstacles.length - 1; i >= 0; i--) {
    game.obstacles[i].update();
    
    // Remove obstacles that are off screen
    if (game.obstacles[i].y > canvas.height) {
      game.obstacles.splice(i, 1);
      game.score += 10;
    }
    
    // Check collision with player
    if (game.player.checkCollision(game.obstacles[i])) {
      game.state = GameState.GAME_OVER;
    }
  }

  // Spawn NPC skiers
  if (Math.random() < 0.01) { // 1% chance per frame
    const lane = Math.floor(Math.random() * 3);
    game.npcSkiers.push(new NPCSkier(game.laneX[lane], -NPC_SKIER_HEIGHT));
  }

  // Spawn obstacles
  if (Math.random() < 0.01) { // 1% chance per frame
    const lane = Math.floor(Math.random() * 3);
    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    game.obstacles.push(new Obstacle(game.laneX[lane], -OBSTACLE_HEIGHT, type));
  }

  // Update score display
  document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.state === GameState.MENU) {
    // Draw menu screen
    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Skier Game', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '20px Arial';
    ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2 + 30);
  } else if (game.state === GameState.PLAYING) {
    // Draw player
    game.player.draw();

    // Draw NPC skiers
    game.npcSkiers.forEach(npc => npc.draw());

    // Draw obstacles
    game.obstacles.forEach(obstacle => obstacle.draw());
  } else if (game.state === GameState.GAME_OVER) {
    // Draw game over screen
    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '20px Arial';
    ctx.fillText(`Final Score: ${game.score}`, canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 70);
  }
}

// Handle keyboard input
window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true;
  
  // Start game on space press
  if (e.key === ' ' && game.state === GameState.MENU) {
    init();
  }
  
  // Restart game on R press
  if (e.key === 'r' && game.state === GameState.GAME_OVER) {
    init();
  }
});

window.addEventListener('keyup', (e) => {
  game.keys[e.key] = false;
});

// Start the game
init();
requestAnimationFrame(gameLoop);
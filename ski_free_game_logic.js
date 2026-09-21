const NPC_SKIER_WIDTH = 20;
const NPC_SKIER_HEIGHT = 30;

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = 200; // pixels per second
    this.color = '#000000'; // Default black
  }

  update(deltaTime) {
    this.y += this.speed * deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details (simple representation)
    ctx.fillStyle = '#FFF';
    ctx.fillRect(this.x + 5, this.y + 5, 3, 3); // Eye
    ctx.fillRect(this.x + 12, this.y + 5, 3, 3); // Eye
  }
}

// Game state
const game = {
  player: null,
  npcSkiers: [],
  score: 0,
  highScore: 0,
  state: GameState.START,
  deltaTime: 0,
  lastTime: 0,
  spawnTimer: 0,
  spawnInterval: 1000 // milliseconds
};

// Initialize game
function initGame() {
  game.player = new Player();
  game.npcSkiers = [];
  game.score = 0;
  game.state = GameState.PLAYING;
  game.spawnTimer = 0;
  updateScore();
}

// Spawn NPC skiers
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
    if (!autoplay.enabled) return;
    
    // Simple autopilot logic
    if (game.player && game.player.state === PlayerState.SKIING) {
      const playerX = game.player.x;
      const nearestNPC = game.npcSkiers.reduce((nearest, skier) => {
        if (skier.y > nearest.y) return skier;
        return nearest;
      }, { y: -1000 });
      
      if (nearestNPC.y > 0 && Math.abs(nearestNPC.x - playerX) < 50) {
        // If NPC is close, avoid it
        if (nearestNPC.x < playerX) {
          autoplay.simulateKeyPress('ArrowRight');
        } else {
          autoplay.simulateKeyPress('ArrowLeft');
        }
      }
    }
  }
};

// Update score display
function updateScore() {
  document.getElementById('score').textContent = `Score: ${game.score}`;
  if (game.score > game.highScore) {
    game.highScore = game.score;
    document.getElementById('highScore').textContent = `High Score: ${game.highScore}`;
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.fillStyle = '#87CEEB'; // Sky blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = '#8B4513'; // Saddle brown
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

  // Draw lanes
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  laneX.forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  });

  // Update and draw player
  if (game.player) {
    game.player.update();
    game.player.draw();
  }

  // Spawn NPC skiers
  game.spawnTimer += game.deltaTime * 1000;
  if (game.spawnTimer > game.spawnInterval) {
    spawnNPCSkiers();
    game.spawnTimer = 0;
  }

  // Update and draw NPC skiers
  game.npcSkiers.forEach((skier, index) => {
    skier.update(game.deltaTime);
    skier.draw();

    // Remove skiers that are off screen
    if (skier.y > canvas.height) {
      game.npcSkiers.splice(index, 1);
      game.score += 10;
      updateScore();
    }
  });

  // Run autoplay if enabled
  autoplay.run();

  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
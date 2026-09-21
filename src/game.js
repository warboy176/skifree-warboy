class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Game constants
    this.PLAYER_WIDTH = 30;
    this.PLAYER_HEIGHT = 50;
    this.PLAYER_SPEED = 200;
    this.PLAYER_COLOR = '#FF0000'; // Red
    this.JUMP_SPEED = 400;
    
    this.NPC_SKIER_WIDTH = 30;
    this.NPC_SKIER_HEIGHT = 50;
    this.NPC_SKIER_SPEED = 150;
    this.NPC_SKIER_COLOR = '#0000FF'; // Blue
    
    this.OBSTACLE_WIDTH = 40;
    this.OBSTACLE_HEIGHT = 40;
    this.OBSTACLE_SPEED = 200;
    this.OBSTACLE_TYPES = ['tree', 'rock', 'log'];
    
    // Game state
    this.player = null;
    this.npcSkiers = [];
    this.obstacles = [];
    this.score = 0;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.gameRunning = true;
    
    // Lane positions
    this.laneX = [this.canvas.width / 4, this.canvas.width / 2, 3 * this.canvas.width / 4];
    
    // Input handling
    this.keys = {};
    
    this.init();
  }
  
  init() {
    this.player = new Player(this.laneX[1] - this.PLAYER_WIDTH / 2, this.canvas.height - this.PLAYER_HEIGHT - 20);
    this.lastTime = performance.now();
    requestAnimationFrame(() => this.gameLoop());
  }
  
  gameLoop() {
    if (!this.gameRunning) return;
    
    // Calculate delta time
    const timestamp = performance.now();
    this.deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw player
    this.player.update();
    this.player.draw();
    
    // Spawn NPC skiers and obstacles
    this.spawnNPCSkiers();
    this.spawnObstacles();
    
    // Update and draw NPC skiers
    this.npcSkiers.forEach(skier => {
      skier.update();
      skier.draw();
    });
    
    // Update and draw obstacles
    this.obstacles.forEach(obstacle => {
      obstacle.update();
      obstacle.draw();
    });
    
    // Check collisions
    this.checkCollisions();
    
    // Continue game loop
    requestAnimationFrame(() => this.gameLoop());
  }
  
  spawnNPCSkiers() {
    // Randomly spawn NPC skiers
    if (Math.random() < 0.02) { // 2% chance per frame
      const lane = Math.floor(Math.random() * 3);
      this.npcSkiers.push(new NPCSkier(this.laneX[lane] - this.NPC_SKIER_WIDTH / 2, -this.NPC_SKIER_HEIGHT));
    }
    
    // Remove skiers that are off screen
    this.npcSkiers = this.npcSkiers.filter(skier => skier.y < this.canvas.height);
  }
  
  spawnObstacles() {
    // Randomly spawn obstacles
    if (Math.random() < 0.01) { // 1% chance per frame
      const lane = Math.floor(Math.random() * 3);
      const type = this.OBSTACLE_TYPES[Math.floor(Math.random() * this.OBSTACLE_TYPES.length)];
      this.obstacles.push(new Obstacle(this.laneX[lane] - this.OBSTACLE_WIDTH / 2, -this.OBSTACLE_HEIGHT, type));
    }
    
    // Remove obstacles that are off screen
    this.obstacles = this.obstacles.filter(obstacle => obstacle.y < this.canvas.height);
  }
  
  checkCollisions() {
    // Player with obstacles
    this.obstacles.forEach(obstacle => {
      if (this.player.checkCollision(obstacle)) {
        this.gameOver();
      }
    });
    
    // Player with NPC skiers
    this.npcSkiers.forEach(skier => {
      if (this.player.checkCollision(skier)) {
        this.gameOver();
      }
    });
  }
  
  gameOver() {
    this.gameRunning = false;
    alert(`Game Over! Your score: ${this.score}`);
    location.reload(); // Restart the game
  }
}

// Start the game
const game = new Game();
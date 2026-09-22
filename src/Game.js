class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    
    this.player = new Player();
    this.npcSkiers = [];
    this.obstacles = [];
    
    this.gameState = GameState.MENU;
    this.score = 0;
    this.deltaTime = 0;
    this.lastTime = 0;
    
    this.keys = {};
    
    this.init();
  }
  
  init() {
    // Set up event listeners
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
    
    // Start game loop
    requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  gameLoop(time) {
    // Calculate delta time
    if (this.lastTime === 0) {
      this.lastTime = time;
    }
    
    this.deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Update and draw based on game state
    if (this.gameState === GameState.PLAYING) {
      this.update();
    }
    
    this.draw();
    
    // Continue game loop
    requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  update() {
    // Update player
    this.player.update(this.keys);
    
    // Spawn NPC skiers
    if (Math.random() < 0.02) { // 2% chance per frame
      const lane = Math.floor(Math.random() * LANE_COUNT);
      this.npcSkiers.push(new NPCSkier(lane));
    }
    
    // Spawn obstacles
    if (Math.random() < 0.015) { // 1.5% chance per frame
      const lane = Math.floor(Math.random() * LANE_COUNT);
      this.obstacles.push(new Obstacle(lane));
    }
    
    // Update NPC skiers
    this.npcSkiers = this.npcSkiers.filter(skier => !skier.update());
    
    // Update obstacles
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.update());
    
    // Check collisions
    this.checkCollisions();
    
    // Increase score
    this.score += Math.floor(this.deltaTime * 10);
  }
  
  checkCollisions() {
    // Check player vs obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      
      if (
        this.player.x < obstacle.x + obstacle.width &&
        this.player.x + this.player.width > obstacle.x &&
        this.player.y < obstacle.y + obstacle.height &&
        this.player.y + this.player.height > obstacle.y
      ) {
        // Collision detected
        this.gameState = GameState.GAME_OVER;
        break;
      }
    }
  }
  
  draw() {
    // Draw background
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw ground
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(0, 500, CANVAS_WIDTH, 100);
    
    if (this.gameState === GameState.PLAYING) {
      // Draw player
      this.player.draw();
      
      // Draw NPC skiers
      this.npcSkiers.forEach(skier => skier.draw());
      
      // Draw obstacles
      this.obstacles.forEach(obstacle => obstacle.draw());
      
      // Draw score
      this.ctx.fillStyle = '#000000';
      this.ctx.font = '20px Arial';
      this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    } else if (this.gameState === GameState.MENU) {
      // Draw menu
      this.ctx.fillStyle = '#000000';
      this.ctx.font = '40px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Ski Racing', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
      
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
      
      this.ctx.textAlign = 'left';
    } else if (this.gameState === GameState.GAME_OVER) {
      // Draw game over screen
      this.ctx.fillStyle = '#000000';
      this.ctx.font = '40px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
      
      this.ctx.font = '20px Arial';
      this.ctx.fillText(`Final Score: ${this.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
      
      this.ctx.fillText('Press R to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
      
      this.ctx.textAlign = 'left';
    }
  }
}
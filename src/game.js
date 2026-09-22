class Game {
  constructor() {
    this.state = 'menu'; // 'menu', 'playing', 'gameOver'
    this.score = 0;
    this.gameSpeed = 1;
    this.lastObstacleTime = 0;
    this.lastNPCSkierTime = 0;
    this.deltaTime = 0;
    this.lastTime = 0;

    this.player = new Player(canvas.width / 2 - PLAYER_WIDTH / 2, canvas.height - PLAYER_HEIGHT - 20);
    this.npcSkiers = [];
    this.obstacles = [];
  }

  update() {
    if (this.state === 'playing') {
      this.player.update();

      // Update obstacles
      this.obstacles.forEach(obstacle => obstacle.update());
      this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOffScreen());

      // Update NPC skiers
      this.npcSkiers.forEach(skier => skier.update());
      this.npcSkiers = this.npcSkiers.filter(skier => !skier.isOffScreen());

      // Generate new obstacles
      const now = performance.now();
      if (now - this.lastObstacleTime > 1000 / this.gameSpeed) { // Adjust frequency based on speed
        const lane = Math.floor(Math.random() * 3);
        const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
        this.obstacles.push(new Obstacle(laneX[lane], -OBSTACLE_HEIGHT, type));
        this.lastObstacleTime = now;
      }

      // Generate new NPC skiers
      if (now - this.lastNPCSkierTime > 2000 / this.gameSpeed) { // Adjust frequency based on speed
        const lane = Math.floor(Math.random() * 3);
        this.npcSkiers.push(new NPCSkier(laneX[lane], -NPC_SKIER_HEIGHT));
        this.lastNPCSkierTime = now;
      }

      // Increase score and speed over time
      this.score += 10 * this.gameSpeed * this.deltaTime;
      this.gameSpeed = 1 + Math.floor(this.score / 5000) * 0.2; // Gradually increase speed

      // Check collisions
      this.checkCollisions();
    }
  }

  draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.state === 'menu') {
      // Draw menu screen
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Ski Game', canvas.width / 2, canvas.height / 2 - 50);
      ctx.font = '20px Arial';
      ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2);
    } else if (this.state === 'playing') {
      // Draw player
      this.player.draw();

      // Draw obstacles
      this.obstacles.forEach(obstacle => obstacle.draw());

      // Draw NPC skiers
      this.npcSkiers.forEach(skier => skier.draw());

      // Draw score
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${Math.floor(this.score)}`, 10, 30);
      ctx.fillText(`Speed: ${this.gameSpeed.toFixed(1)}`, 10, 60);
    } else if (this.state === 'gameOver') {
      // Draw game over screen
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);
      ctx.font = '20px Arial';
      ctx.fillText(`Final Score: ${Math.floor(this.score)}`, canvas.width / 2, canvas.height / 2);
      ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 50);
    }
  }

  checkCollisions() {
    // Check player vs obstacles
    this.obstacles.forEach(obstacle => {
      if (this.player.checkCollision(obstacle)) {
        this.state = 'gameOver';
      }
    });

    // Check player vs NPC skiers
    this.npcSkiers.forEach(skier => {
      if (this.player.checkCollision(skier)) {
        this.state = 'gameOver';
      }
    });
  }

  reset() {
    this.state = 'menu';
    this.score = 0;
    this.gameSpeed = 1;
    this.npcSkiers = [];
    this.obstacles = [];
  }
}
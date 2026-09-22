class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = 150; // Speed of NPC skiers
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = NPC_SKIER_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw skis
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x - 5, this.y + this.height, this.width + 10, 5);
  }

  isOffScreen() {
    return this.y > canvas.height;
  }

  checkCollision(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}
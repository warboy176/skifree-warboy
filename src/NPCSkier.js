class NPCSkier {
  constructor(lane) {
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.x = laneX[lane];
    this.y = -this.height;
    this.speed = NPC_SKIER_SPEED;
    this.lane = lane;
  }

  update() {
    this.y += this.speed * game.deltaTime;

    // Remove skier if off screen
    return this.y > 600;
  }

  draw() {
    ctx.fillStyle = NPC_SKIER_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw skis
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x - 5, this.y + this.height, this.width + 10, 5);
  }
}
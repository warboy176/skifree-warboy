class Obstacle {
  constructor(lane) {
    this.width = OBSTACLE_WIDTH;
    this.height = OBSTACLE_HEIGHT;
    this.x = laneX[lane];
    this.y = -this.height;
    this.speed = OBSTACLE_SPEED;
    this.type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
  }

  update() {
    this.y += this.speed * game.deltaTime;

    // Remove obstacle if off screen
    return this.y > 600;
  }

  draw() {
    ctx.fillStyle = OBSTACLE_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw obstacle details based on type
    if (this.type === 'tree') {
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y, this.width / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'rock') {
      ctx.fillStyle = '#696969';
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'box') {
      ctx.fillStyle = '#D2B48C';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
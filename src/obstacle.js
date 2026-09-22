class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = OBSTACLE_WIDTH;
    this.height = OBSTACLE_HEIGHT;
    this.type = type;
    this.speed = 200; // Speed of obstacles
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = OBSTACLE_COLORS[this.type];
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw specific obstacle details based on type
    if (this.type === 'tree') {
      // Draw a simple tree trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(this.x + this.width/2 - 5, this.y + this.height - 20, 10, 20);
    } else if (this.type === 'snowball') {
      // Draw a snowball
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  isOffScreen() {
    return this.y > canvas.height;
  }
}
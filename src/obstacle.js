class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speed = 150; // pixels per second
    this.type = type; // 'tree', 'rock', 'snowball'
    this.color = this.getObstacleColor();
  }

  getObstacleColor() {
    switch (this.type) {
      case 'tree':
        return '#8B4513'; // Brown
      case 'rock':
        return '#A9A9A9'; // Gray
      case 'snowball':
        return '#FFFFFF'; // White
      default:
        return '#000000'; // Black
    }
  }

  update() {
    this.y += this.speed * deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw simple obstacle shapes based on type
    if (this.type === 'tree') {
      ctx.fillStyle = '#228B22'; // Green for tree top
      ctx.fillRect(this.x + 10, this.y - 10, 20, 10); // Tree top
    } else if (this.type === 'rock') {
      ctx.fillStyle = '#696969'; // Dark gray for rock
      ctx.beginPath();
      ctx.arc(this.x + 20, this.y + 20, 15, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'snowball') {
      ctx.fillStyle = '#E0FFFF'; // Light blue for snowball
      ctx.beginPath();
      ctx.arc(this.x + 20, this.y + 20, 15, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
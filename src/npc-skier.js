class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.speed = 150; // pixels per second
    this.color = '#0000FF'; // Blue
  }

  update() {
    this.y += this.speed * deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw a simple skier shape
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 5, this.y + 10, 20, 5); // Skier head
    ctx.fillRect(this.x + 10, this.y + 15, 10, 20); // Skier body
  }
}
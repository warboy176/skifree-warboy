// Player Skier class
class Skier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 30;
    this.speed = 5;
  }

  update() {
    const pressed = Input.keys;
    
    if (Input.isPressed('ArrowLeft') || Input.isPressed('a')) {
      this.x = Math.max(0, this.x - this.speed * game.deltaTime);
    }
    
    if (Input.isPressed('ArrowRight') || Input.isPressed('d')) {
      this.x = Math.min(CANVAS_WIDTH - this.width, this.x + this.speed * game.deltaTime);
    }
  }

  draw() {
    ctx.fillStyle = '#FF0000'; // Red skier
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skis
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x - 2, this.y + this.height, this.width + 4, 3);
  }
}

export default Skier;
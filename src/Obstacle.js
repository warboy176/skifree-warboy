// Obstacle class
class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = OBSTACLE_WIDTH;
    this.height = OBSTACLE_HEIGHT;
    this.type = type;
    this.color = OBSTACLE_COLORS[type];
  }

  update() {
    // Move obstacle down
    this.y += NPC_SKIER_SPEED * game.deltaTime; // Use same speed as NPC skiers
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
// Obstacle logic
if (game.state === GameState.PLAYING) {
  spawnObstacles();
  game.obstacles.forEach(obstacle => {
    obstacle.update();
    obstacle.draw();
  });
}

function spawnObstacles() {
  // Spawn a new obstacle occasionally
  if (Math.random() < 0.02) {
    const x = laneX[Math.floor(Math.random() * laneX.length)];
    const y = -OBSTACLE_HEIGHT;
    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    const obstacle = new Obstacle(x, y, type);
    game.obstacles.push(obstacle);
  }
}

// Obstacle class
class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed = OBSTACLE_SPEED;
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = OBSTACLE_COLOR;
    ctx.fillRect(this.x, this.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
  }
}

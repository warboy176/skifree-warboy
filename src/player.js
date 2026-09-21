// Player logic
if (game.state === GameState.PLAYING) {
  game.player.update();
  game.player.draw();
}

// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = PLAYER_SPEED;
    this.lane = 1; // Start in center lane
    this.jumping = false;
    this.jumpHeight = 0;
    this.jumpSpeed = JUMP_SPEED;
    this.trick = null;
  }

  update() {
    // Handle input
    if (keys['ArrowLeft'] && this.lane > 0) {
      this.lane--;
    } else if (keys['ArrowRight'] && this.lane < laneX.length - 1) {
      this.lane++;
    }

    // Update position based on lane
    this.x = laneX[this.lane] - this.width / 2;

    // Handle jump
    if (keys[' '] && !this.jumping) {
      this.jumping = true;
      this.jumpHeight = 0;
    }

    if (this.jumping) {
      this.jumpHeight += this.jumpSpeed * game.deltaTime;
      if (this.jumpHeight > JUMP_MAX_HEIGHT) {
        this.jumping = false;
        this.jumpHeight = 0;
      }
    }
  }

  draw() {
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(this.x, this.y - this.jumpHeight, this.width, this.height);
  }

  // Check collision with obstacles
  checkCollision(obstacle) {
    return (
      this.x < obstacle.x + OBSTACLE_WIDTH &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + OBSTACLE_HEIGHT &&
      this.y + this.height > obstacle.y
    );
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = PLAYER_SPEED;
    this.isJumping = false;
    this.jumpVelocity = 0;
    this.jumpHeight = 0;
    this.lane = 1; // Start in middle lane
  }

  update() {
    // Handle left/right movement
    if (keys['ArrowLeft'] || keys['a']) {
      this.x = Math.max(0, this.x - this.speed * game.deltaTime);
      this.lane = Math.max(0, this.lane - 1);
    }
    if (keys['ArrowRight'] || keys['d']) {
      this.x = Math.min(300, this.x + this.speed * game.deltaTime);
      this.lane = Math.min(2, this.lane + 1);
    }

    // Handle jumping
    if ((keys[' '] || keys['ArrowUp'] || keys['w']) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -JUMP_SPEED;
      this.jumpHeight = 0;
    }

    if (this.isJumping) {
      this.y += this.jumpVelocity * game.deltaTime;
      this.jumpHeight -= this.jumpVelocity * game.deltaTime;
      this.jumpVelocity += 500 * game.deltaTime; // Gravity

      if (this.jumpHeight >= JUMP_MAX_HEIGHT || this.jumpVelocity > 0) {
        this.isJumping = false;
        this.y = Math.min(canvas.height - this.height - 20, this.y);
      }
    }
  }

  draw() {
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw skis
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x - 5, this.y + this.height, this.width + 10, 5);
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

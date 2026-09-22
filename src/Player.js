class Player {
  constructor() {
    this.width = 30;
    this.height = 60;
    this.x = 300; // Start in the middle lane
    this.y = 500;
    this.speed = 200;
    this.isJumping = false;
    this.jumpVelocity = 0;
    this.jumpHeight = 0;
  }

  update() {
    // Handle left/right movement
    if (keys['ArrowLeft'] || keys['a']) {
      this.x -= this.speed * game.deltaTime;
    }
    if (keys['ArrowRight'] || keys['d']) {
      this.x += this.speed * game.deltaTime;
    }

    // Keep player within canvas bounds
    this.x = Math.max(0, Math.min(800 - this.width, this.x));

    // Handle jumping
    if ((keys[' '] || keys['ArrowUp'] || keys['w']) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -JUMP_SPEED;
    }

    if (this.isJumping) {
      this.y += this.jumpVelocity * game.deltaTime;
      this.jumpVelocity += 500 * game.deltaTime; // Gravity
      this.jumpHeight += Math.abs(this.jumpVelocity) * game.deltaTime;

      if (this.jumpHeight >= JUMP_MAX_HEIGHT) {
        this.jumpVelocity = Math.abs(this.jumpVelocity) * -0.8; // Bounce back
      }

      if (this.y >= 500) {
        this.y = 500;
        this.isJumping = false;
        this.jumpHeight = 0;
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
}
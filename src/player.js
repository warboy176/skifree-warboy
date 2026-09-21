class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;
    this.speed = 200; // pixels per second
    this.color = '#FF0000'; // Red
    this.isJumping = false;
    this.jumpVelocity = 0;
    this.gravity = 800; // pixels per second squared
    this.lane = 1; // Start in middle lane (0, 1, or 2)
    this.laneX = [200, 400, 600]; // X positions for each lane
  }

  update() {
    // Handle horizontal movement
    if (keyState['ArrowLeft'] || keyState['a']) {
      this.lane = Math.max(0, this.lane - 1);
    }
    if (keyState['ArrowRight'] || keyState['d']) {
      this.lane = Math.min(2, this.lane + 1);
    }

    // Handle jumping
    if ((keyState[' '] || keyState['w'] || keyState['ArrowUp']) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -400; // Upward velocity
    }

    // Update jump physics
    if (this.isJumping) {
      this.y += this.jumpVelocity * deltaTime;
      this.jumpVelocity += this.gravity * deltaTime;

      // Land when reaching the ground
      if (this.y >= 500) { // Ground level
        this.y = 500;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }

    // Smoothly move to target lane
    const targetX = this.laneX[this.lane];
    if (Math.abs(this.x - targetX) > 1) {
      this.x += (targetX - this.x) * 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw a simple skier shape
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 5, this.y + 10, 20, 5); // Skier head
    ctx.fillRect(this.x + 10, this.y + 15, 10, 20); // Skier body
  }

  checkCollision(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
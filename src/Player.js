// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = PLAYER_SPEED;
    this.color = PLAYER_COLOR;
    this.isJumping = false;
    this.jumpVelocity = 0;
    this.gravity = 500;
  }

  update() {
    // Handle horizontal movement
    if (game.keys['ArrowLeft'] || game.keys['a']) {
      this.x -= this.speed * game.deltaTime;
    }
    if (game.keys['ArrowRight'] || game.keys['d']) {
      this.x += this.speed * game.deltaTime;
    }
    
    // Handle jumping
    if ((game.keys[' '] || game.keys['ArrowUp'] || game.keys['w']) && !this.isJumping) {
      this.isJumping = true;
      this.jumpVelocity = -JUMP_SPEED;
    }
    
    // Apply gravity
    if (this.isJumping) {
      this.y += this.jumpVelocity * game.deltaTime;
      this.jumpVelocity += this.gravity * game.deltaTime;
      
      // Check if player has landed
      if (this.y >= canvas.height - 100) {
        this.y = canvas.height - 100;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }
    
    // Keep player within canvas bounds
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
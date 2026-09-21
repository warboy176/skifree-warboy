const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 200;

// Player state
const PlayerState = {
  SKIING: 'skiing',
  CRASHED: 'crashed'
};

// Game state
const GameState = {
  START: 'start',
  INTRO: 'intro',
  PLAYING: 'playing'
};

// Input handling
const input = {
  keys: {},
  pointer: false,
  pointerX: 0,
  pointerY: 0
};

const pressed = new Set();

window.addEventListener('keydown', (e) => {
  pressed.add(e.key);
  input.keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  pressed.delete(e.key);
  input.keys[e.key] = false;
});

// Player class
class Player {
  constructor() {
    this.x = laneX[1]; // Start in the middle lane
    this.y = canvas.height - PLAYER_HEIGHT - 20;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.state = PlayerState.SKIING;
    this.color = '#FFA500'; // Orange color for player
  }

  update() {
    if (this.state === PlayerState.CRASHED) return;

    // Handle input
    if (input.keys['ArrowLeft'] || input.keys['a']) {
      this.x = Math.max(laneX[0], this.x - PLAYER_SPEED * game.deltaTime);
    }
    if (input.keys['ArrowRight'] || input.keys['d']) {
      this.x = Math.min(laneX[laneX.length - 1] - this.width, this.x + PLAYER_SPEED * game.deltaTime);
    }

    // Check for collisions with NPCs
    game.npcSkiers.forEach(skier => {
      if (
        this.x < skier.x + skier.width &&
        this.x + this.width > skier.x &&
        this.y < skier.y + skier.height &&
        this.y + this.height > skier.y
      ) {
        this.state = PlayerState.CRASHED;
        game.state = GameState.PLAYING; // Reset to playing to trigger crash logic
        statusEl.textContent = 'Crashed! Press Enter or tap to restart.';
        // Reset game after a delay
        setTimeout(() => {
          initGame();
        }, 1000);
      }
    });
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details (simple representation)
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 5, this.y + 5, 3, 3); // Eye
    ctx.fillRect(this.x + 12, this.y + 5, 3, 3); // Eye
  }
}

// Initialize player
function initPlayer() {
  game.player = new Player();
}

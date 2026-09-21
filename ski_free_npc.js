const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
const GameState = {
  START: 'start',
  INTRO: 'intro',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver'
};

// Game object
let game = {
  state: GameState.START,
  player: null,
  npcSkiers: [],
  keys: new Set(),
  input: {
    pointer: false,
    pointerX: 0,
    pointerY: 0
  },
  lastTime: 0,
  deltaTime: 0,
  score: 0,
  highScore: localStorage.getItem('skiHighScore') || 0
};

// Constants
const LANE_COUNT = 3;
const LANE_WIDTH = canvas.width / LANE_COUNT;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const NPC_SKIER_WIDTH = 20;
const NPC_SKIER_HEIGHT = 20;
const SKI_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
const LANE_X = [LANE_WIDTH/2 - PLAYER_WIDTH/2, LANE_WIDTH + LANE_WIDTH/2 - PLAYER_WIDTH/2, LANE_WIDTH*2 + LANE_WIDTH/2 - PLAYER_WIDTH/2];

// Player class
class Player {
  constructor() {
    this.x = LANE_X[1]; // Start in middle lane
    this.y = canvas.height - 50;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = 200; // pixels per second
    this.color = '#FF8C00';
  }

  update() {
    // Handle input
    if (game.keys.has('ArrowLeft') || game.keys.has('a') || game.keys.has('A')) {
      this.x = Math.max(0, this.x - this.speed * game.deltaTime);
    }
    if (game.keys.has('ArrowRight') || game.keys.has('d') || game.keys.has('D')) {
      this.x = Math.min(canvas.width - this.width, this.x + this.speed * game.deltaTime);
    }

    // Handle pointer input
    if (game.input.pointer) {
      const laneIndex = Math.floor(game.input.pointerX / LANE_WIDTH);
      const targetX = LANE_X[laneIndex];
      if (targetX !== undefined) {
        this.x = targetX;
      }
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details (simple representation)
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 4, this.y + 4, 3, 3); // Eye
    ctx.fillRect(this.x + 13, this.y + 4, 3, 3); // Eye
  }
}

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = 100 + Math.random() * 100; // Random speed
    this.color = '#8B4513';
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details (simple representation)
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 4, this.y + 4, 3, 3); // Eye
    ctx.fillRect(this.x + 13, this.y + 4, 3, 3); // Eye
  }
}

// NPC Skier management
function spawnNPCSkiers() {
  if (game.npcSkiers.length < 5) {
    const x = LANE_X[Math.floor(Math.random() * LANE_X.length)];
    const y = -NPC_SKIER_HEIGHT;
    const skier = new NPCSkier(x, y);
    game.npcSkiers.push(skier);
  }
}

// Game loop
function gameLoop(timestamp) {
  // Calculate delta time
  if (game.lastTime === 0) game.lastTime = timestamp;
  game.deltaTime = (timestamp - game.lastTime) / 1000;
  game.lastTime = timestamp;

  // Clear canvas
  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (game.state === GameState.START) {
    showIntro();
  } else if (game.state === GameState.INTRO) {
    handleIntroInput();
  } else if (game.state === GameState.PLAYING) {
    // Update player
    if (!game.player) game.player = new Player();
    game.player.update();
    game.player.draw();

    // Spawn NPC skiers
    spawnNPCSkiers();
    
    // Update and draw NPC skiers
    game.npcSkiers.forEach((skier, index) => {
      skier.update();
      skier.draw();

      // Remove skiers that are off screen
      if (skier.y > canvas.height) {
        game.npcSkiers.splice(index, 1);
        game.score += 10;
      }
    });

    // Autoplayer logic
    autoplay.run();
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Input handling
const pressed = new Set();

function handleKeyDown(e) {
  pressed.add(e.key);
  game.keys.add(e.key);
}

function handleKeyUp(e) {
  pressed.delete(e.key);
  game.keys.delete(e.key);
}

function handlePointerDown(e) {
  game.input.pointer = true;
  const rect = canvas.getBoundingClientRect();
  game.input.pointerX = e.clientX - rect.left;
  game.input.pointerY = e.clientY - rect.top;
}

function handlePointerMove(e) {
  if (game.input.pointer) {
    const rect = canvas.getBoundingClientRect();
    game.input.pointerX = e.clientX - rect.left;
    game.input.pointerY = e.clientY - rect.top;
  }
}

function handlePointerUp() {
  game.input.pointer = false;
}

// Event listeners
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
canvas.addEventListener('pointerdown', handlePointerDown);
canvas.addEventListener('pointermove', handlePointerMove);
canvas.addEventListener('pointerup', handlePointerUp);

// Autoplayer logic
let autoplay = {
  enabled: new URLSearchParams(window.location.search).get('demo') === '1',
  simulateKeyPress: function(key) {
    const event = new KeyboardEvent('keydown', { code: key, key: key, repeat: false });
    document.dispatchEvent(event);
    setTimeout(() => {
      const upEvent = new KeyboardEvent('keyup', { code: key, key: key });
      document.dispatchEvent(upEvent);
    }, 100);
  },
  run: function() {
    if (!autoplay.enabled) return;
    
    // Simple AI logic
    if (game.player && game.npcSkiers.length > 0) {
      const player = game.player;
      const nearestSkier = game.npcSkiers.reduce((nearest, skier) => {
        if (!nearest || skier.y > nearest.y) return skier;
        return nearest;
      }, null);
      
      if (nearestSkier && nearestSkier.y < 200) { // If skier is close
        if (player.x < nearestSkier.x) {
          autoplay.simulateKeyPress('ArrowRight');
        } else if (player.x > nearestSkier.x) {
          autoplay.simulateKeyPress('ArrowLeft');
        }
      }
    }
  }
};

// Initialize game
function initGame() {
  canvas.width = 500;
  canvas.height = 600;
  game.state = GameState.START;
}

// Start the game
initGame();
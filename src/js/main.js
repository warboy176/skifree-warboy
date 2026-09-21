import Input from './input.js';
import Skier from './skier.js';
import { game, GameState } from './game.js';

const statusEl = document.getElementById('status');

// Handle keyboard input
window.addEventListener('keydown', (e) => {
  Input.keys.add(e.key);
});

window.addEventListener('keyup', (e) => {
  Input.keys.delete(e.key);
});

// Handle mouse input
window.addEventListener('mousedown', () => {
  Input.pointer = true;
});

window.addEventListener('mouseup', () => {
  Input.pointer = false;
});

// Initialize game
function init() {
  // Set up canvas
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // Start the game loop
  requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop(timestamp) {
  // Calculate delta time
  if (game.lastTime === 0) {
    game.lastTime = timestamp;
  }
  game.deltaTime = (timestamp - game.lastTime) / 1000;
  game.lastTime = timestamp;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (game.state === GameState.START) {
    showIntro();
  } else if (game.state === GameState.INTRO) {
    handleIntroInput();
  } else if (game.state === GameState.PLAYING) {
    // Update and draw player skier
    if (game.skier) {
      game.skier.update();
      game.skier.draw();
    }
    
    // Spawn NPC skiers
    spawnNPCSkiers();
    
    // Update and draw NPC skiers
    game.npcSkiers.forEach(skier => {
      skier.update();
      skier.draw();
    });
    
    // Remove off-screen NPC skiers
    game.npcSkiers = game.npcSkiers.filter(skier => skier.y < canvas.height);
  }
  
  requestAnimationFrame(gameLoop);
}

// Show intro screen
function showIntro() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SKI FREE', canvas.width / 2, canvas.height / 2 - 50);
  
  ctx.font = '16px Arial';
  ctx.fillText('Press ENTER or click to start', canvas.width / 2, canvas.height / 2 + 20);
}

// Handle intro input
function handleIntroInput() {
  if (Input.isPressed('Enter') || Input.pointer) {
    game.state = GameState.PLAYING;
    // Initialize player skier
    game.skier = new Skier(canvas.width / 2 - 20 / 2, canvas.height - 100);
    statusEl.textContent = '';
  }
}

// Spawn NPC skiers
function spawnNPCSkiers() {
  // Only spawn if we don't have too many
  if (game.npcSkiers.length < 5) {
    const x = [canvas.width / 6 - 20 / 2, canvas.width / 2 - 20 / 2, (canvas.width / 6 * 5) - 20 / 2][Math.floor(Math.random() * 3)];
    const y = -30;
    const color = ['#FF0000', '#00FF00', '#FFFF00', '#FF00FF'][Math.floor(Math.random() * 4)];
    const skier = new NPCSkier(x, y);
    skier.color = color;
    game.npcSkiers.push(skier);
  }
}

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 30;
    this.speed = 150;
    this.color = '#0000FF';
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skis
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x - 2, this.y + this.height, this.width + 4, 3);
  }
}

init();
const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = NPC_SKIER_SPEED;
    this.color = SKI_COLORS[Math.floor(Math.random() * SKI_COLORS.length)];
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw skier details (simple representation)
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 5, this.y + 5, 3, 3); // eyes
    ctx.fillRect(this.x + 12, this.y + 5, 3, 3); // eyes
  }
}

// NPC Skier management
function spawnNPCSkiers() {
  if (game.npcSkiers.length < 5) {
    const x = laneX[Math.floor(Math.random() * laneX.length)];
    const y = -NPC_SKIER_HEIGHT;
    const skier = new NPCSkier(x, y);
    game.npcSkiers.push(skier);
  }
}

function updateNPCSkiers() {
  // Update all NPC skiers
  for (let i = game.npcSkiers.length - 1; i >= 0; i--) {
    const skier = game.npcSkiers[i];
    skier.update();
    
    // Remove skiers that are off screen
    if (skier.y > canvas.height) {
      game.npcSkiers.splice(i, 1);
    }
  }
}

function drawNPCSkiers() {
  game.npcSkiers.forEach(skier => skier.draw());
}

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
    
    // Simple autopilot logic
    if (game.state === GameState.PLAYING && game.player && game.player.state === PlayerState.SKIING) {
      // Randomly decide to jump or change lanes
      if (Math.random() < 0.02) {
        autoplay.simulateKeyPress(' '); // Jump
      }
      
      // Change lanes occasionally
      if (Math.random() < 0.01) {
        const direction = Math.random() > 0.5 ? 'ArrowRight' : 'ArrowLeft';
        autoplay.simulateKeyPress(direction);
      }
    }
  }
};
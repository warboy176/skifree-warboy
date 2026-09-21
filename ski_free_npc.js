const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
const laneX = [100, 200, 300, 400, 500];

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = NPC_SKIER_SPEED;
    this.color = NPC_SKIER_COLOR;
  }

  update() {
    this.y += this.speed * game.deltaTime;
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

// NPC Skier logic
function spawnNPCSkiers() {
  if (game.npcSkiers.length < 5) {
    const x = laneX[Math.floor(Math.random() * laneX.length)];
    const y = -NPC_SKIER_HEIGHT;
    const color = SKI_COLORS[Math.floor(Math.random() * SKI_COLORS.length)];
    const skier = new NPCSkier(x, y);
    skier.color = color;
    game.npcSkiers.push(skier);
  }
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
    if (game.player && game.player.state === PlayerState.SKIING) {
      const playerX = game.player.x;
      const nearestNPC = game.npcSkiers.reduce((nearest, skier) => {
        if (skier.y > nearest.y) return skier;
        return nearest;
      }, { y: -1000 });
      
      if (nearestNPC.y > 0 && Math.abs(nearestNPC.x - playerX) < 50) {
        // If NPC is close, avoid it
        if (nearestNPC.x < playerX) {
          autoplay.simulateKeyPress('ArrowRight');
        } else {
          autoplay.simulateKeyPress('ArrowLeft');
        }
      }
    }
  }
};
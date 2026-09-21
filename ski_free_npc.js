const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = NPC_SKIER_WIDTH;
    this.height = NPC_SKIER_HEIGHT;
    this.speed = NPC_SKIER_SPEED;
    this.color = NPC_SKIER_COLOR;
    this.lane = 0;
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
    if (!autoplay.enabled || game.state !== GameState.PLAYING) return;
    
    // Simple AI to avoid obstacles
    const player = game.player;
    const nearestObstacle = game.obstacles.find(obs => obs.y > player.y - 100 && obs.y < player.y + 100);
    
    if (nearestObstacle) {
      if (nearestObstacle.x < player.x) {
        autoplay.simulateKeyPress('ArrowLeft');
      } else if (nearestObstacle.x > player.x + player.width) {
        autoplay.simulateKeyPress('ArrowRight');
      }
    }
    
    // Jump over obstacles
    if (nearestObstacle && nearestObstacle.y - player.y < 50 && nearestObstacle.y - player.y > 0) {
      autoplay.simulateKeyPress(' '); // Spacebar for jump
    }
  }
};

// Add to game loop
function gameLoop() {
  if (game.state === GameState.START) {
    showIntro();
  } else if (game.state === GameState.INTRO) {
    handleIntroInput();
  } else if (game.state === GameState.PLAYING) {
    // Existing playing logic
    
    // NPC Skier logic
    spawnNPCSkiers();
    game.npcSkiers.forEach(skier => {
      skier.update();
      skier.draw();
    });
    
    // Autoplayer
    autoplay.run();
  }
  
  requestAnimationFrame(gameLoop);
}
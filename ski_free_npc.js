(() => {
  'use strict';

  // NPC Skier constants
  const NPC_SKIER_SPEED = 200;
  const NPC_SKIER_WIDTH = 20;
  const NPC_SKIER_HEIGHT = 20;
  const NPC_SKIER_COLOR = '#ffcc00';

  // NPC Skier class
  class NPCSkier {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speed = NPC_SKIER_SPEED;
      this.width = NPC_SKIER_WIDTH;
      this.height = NPC_SKIER_HEIGHT;
      this.color = NPC_SKIER_COLOR;
    }

    update() {
      this.y += this.speed * game.deltaTime;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  // NPC Skier management
  function spawnNPCSkiers() {
    if (game.npcSkiers.length < 5) { // Limit to 5 NPCs
      const x = laneX[Math.floor(Math.random() * laneX.length)];
      const y = -NPC_SKIER_HEIGHT;
      const skier = new NPCSkier(x, y);
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

      // Simple autopilot logic
      if (Math.random() < 0.02) { // 2% chance per frame to change direction
        const direction = Math.random() > 0.5 ? 'ArrowRight' : 'ArrowLeft';
        autoplay.simulateKeyPress(direction);
      }

      // Jump occasionally
      if (Math.random() < 0.005) { // 0.5% chance per frame to jump
        autoplay.simulateKeyPress(' '); // Spacebar
      }
    }
  };

  // Add NPC skier logic to game loop
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
      
      // Remove off-screen NPCs
      game.npcSkiers = game.npcSkiers.filter(skier => skier.y < canvas.height);
      
      // Autoplayer
      autoplay.run();
    }
    
    requestAnimationFrame(gameLoop);
  }

  // Initialize NPC skiers array
  game.npcSkiers = [];

  // Start the game loop
  requestAnimationFrame(gameLoop);
})();
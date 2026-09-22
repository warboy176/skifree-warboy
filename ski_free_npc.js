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
    if (game.npcSkiers.length < 5) {
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
      const player = game.player;
      const npcSkiers = game.npcSkiers;

      if (npcSkiers.length > 0) {
        // Find the closest NPC skier in front of player
        const closestInFront = npcSkiers
          .filter(skier => skier.y > player.y - 100 && skier.y < player.y + 200)
          .sort((a, b) => a.y - b.y)[0];

        if (closestInFront) {
          // If NPC is to the left of player, steer right
          if (closestInFront.x < player.x) {
            autoplay.simulateKeyPress('ArrowRight');
          } else if (closestInFront.x > player.x + player.width) {
            autoplay.simulateKeyPress('ArrowLeft');
          }
        }
      }
    }
  };

  // Add NPC skiers to game object
  game.npcSkiers = [];

  // Modify game loop to handle NPC skiers and autoplay
  const originalGameLoop = gameLoop;
  gameLoop = function() {
    if (game.state === GameState.START) {
      showIntro();
    } else if (game.state === GameState.INTRO) {
      handleIntroInput();
    } else if (game.state === GameState.PLAYING) {
      // Update NPC skiers
      game.npcSkiers.forEach(skier => {
        skier.update();
        skier.draw();
      });

      // Remove off-screen NPC skiers
      game.npcSkiers = game.npcSkiers.filter(skier => skier.y < canvas.height);

      // Spawn new NPC skiers
      spawnNPCSkiers();

      // Run autoplay if enabled
      autoplay.run();
    }

    requestAnimationFrame(gameLoop);
  };

  // Initialize game loop
  requestAnimationFrame(gameLoop);
})();
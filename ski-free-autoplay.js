(() => {
  'use strict';

  // Autoplayer functionality for SkiFree game
  const autoplay = {
    enabled: new URLSearchParams(window.location.search).get('demo') === '1',
    
    // Simulate key presses for autoplay
    simulateKeyPress: function(key) {
      const event = new KeyboardEvent('keydown', { code: key, key: key, repeat: false });
      document.dispatchEvent(event);
      
      setTimeout(() => {
        const upEvent = new KeyboardEvent('keyup', { code: key, key: key });
        document.dispatchEvent(upEvent);
      }, 100);
    },
    
    // Main autoplay logic
    run: function() {
      if (!this.enabled) return;
      
      // Get player position (assuming it's tracked in game.player)
      const player = game.player;
      if (!player || !game.npcSkiers || game.npcSkiers.length === 0) return;
      
      // Find the closest NPC skier in front of the player
      let closestSkier = null;
      let minDistance = Infinity;
      
      game.npcSkiers.forEach(skier => {
        if (skier.y > player.y && skier.y < player.y + 300) { // Only consider skiers in front
          const distance = Math.abs(skier.x - player.x);
          if (distance < minDistance) {
            minDistance = distance;
            closestSkier = skier;
          }
        }
      });
      
      if (closestSkier) {
        // If the NPC skier is to the left of player, move right
        if (closestSkier.x < player.x - 10) {
          this.simulateKeyPress('ArrowRight');
        }
        // If the NPC skier is to the right of player, move left
        else if (closestSkier.x > player.x + 10) {
          this.simulateKeyPress('ArrowLeft');
        }
      }
    },
    
    // Start autoplay loop
    start: function() {
      if (!this.enabled) return;
      
      const autoplayLoop = () => {
        this.run();
        setTimeout(autoplayLoop, 200); // Run every 200ms
      };
      
      autoplayLoop();
    }
  };

  // Export autoplay for use in main game
  window.autoplay = autoplay;

  // Initialize autoplay if enabled
  if (autoplay.enabled) {
    autoplay.start();
  }
})();

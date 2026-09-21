(() => {
  'use strict';

  // Autoplayer logic for SkiFree game
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
      if (!autoplay.enabled || !game.player) return;

      // Get player position
      const playerX = game.player.x;
      const playerY = game.player.y;
      
      // Find nearest NPC skier in front of player
      let nearestSkier = null;
      let minDistance = Infinity;
      
      game.npcSkiers.forEach(skier => {
        if (skier.y > playerY && skier.y < playerY + 300) { // Only consider skiers in front
          const distance = Math.abs(skier.x - playerX);
          if (distance < minDistance) {
            minDistance = distance;
            nearestSkier = skier;
          }
        }
      });

      // Simple AI decision making
      if (nearestSkier) {
        // If NPC skier is close, avoid it
        if (minDistance < 80) {
          // Move away from the skier
          if (nearestSkier.x > playerX) {
            this.simulateKeyPress('ArrowLeft');
          } else {
            this.simulateKeyPress('ArrowRight');
          }
        }
      } else {
        // Random movement when no skiers nearby
        if (Math.random() > 0.95) {
          this.simulateKeyPress(Math.random() > 0.5 ? 'ArrowLeft' : 'ArrowRight');
        }
      }
    }
  };

  // Run autoplay if enabled
  if (autoplay.enabled) {
    setInterval(autoplay.run, 100);
  }

  // Export for use in main game file
  window.autoplay = autoplay;
})();
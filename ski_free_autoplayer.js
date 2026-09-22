(() => {
  'use strict';

  // Autoplayer for Ski Free
  const autoplay = {
    run: function() {
      if (game.state === GameState.PLAYING && game.player) {
        // Get player position
        const playerX = game.player.x;
        
        // Find nearest NPC skier in the same lane or adjacent lanes
        let nearestSkier = null;
        let minDistance = Infinity;
        
        game.npcSkiers.forEach(skier => {
          if (skier.y > 0 && skier.y < canvas.height) { // Only consider skiers on screen
            const distance = Math.abs(playerX - skier.x);
            if (distance < minDistance) {
              minDistance = distance;
              nearestSkier = skier;
            }
          }
        });
        
        // Simple avoidance logic
        if (nearestSkier && minDistance < 100) { // If skier is close
          if (nearestSkier.x < playerX - 20) {
            // Skier is to the left, move right
            autoplay.simulateKeyPress('ArrowRight');
          } else if (nearestSkier.x > playerX + 20) {
            // Skier is to the right, move left
            autoplay.simulateKeyPress('ArrowLeft');
          }
        }
        
        // Occasionally jump to avoid obstacles
        if (Math.random() < 0.01) { // 1% chance per frame
          autoplay.simulateKeyPress(' '); // Spacebar for jump
        }
      }
    },
    
    simulateKeyPress: function(key) {
      // Create and dispatch a keydown event
      const event = new KeyboardEvent('keydown', { key: key });
      document.dispatchEvent(event);
      
      // For spacebar, also dispatch keyup
      if (key === ' ') {
        setTimeout(() => {
          const upEvent = new KeyboardEvent('keyup', { key: key });
          document.dispatchEvent(upEvent);
        }, 100);
      }
    }
  };

  // Add autoplayer to game loop
  const originalGameLoop = gameLoop;
  
  function enhancedGameLoop(timestamp) {
    if (!game.lastTime) game.lastTime = timestamp;
    game.deltaTime = Math.min(0.1, (timestamp - game.lastTime) / 1000);
    game.lastTime = timestamp;

    // Run autoplayer logic
    autoplay.run();
    
    // Call original game loop
    originalGameLoop(timestamp);
  }

  // Override the game loop with enhanced version
  window.gameLoop = enhancedGameLoop;

  // Export autoplay for debugging
  window.autoplay = autoplay;
})();
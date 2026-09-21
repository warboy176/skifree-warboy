// Main game loop
function gameLoop() {
  // Calculate delta time for smooth animation
  const now = performance.now();
  if (game.lastTime) {
    game.deltaTime = (now - game.lastTime) / 1000; // Convert to seconds
  } else {
    game.deltaTime = 0;
  }
  game.lastTime = now;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Handle different game states
  if (game.state === GameState.START) {
    showIntro();
  } else if (game.state === GameState.INTRO) {
    handleIntroInput();
  } else if (game.state === GameState.PLAYING) {
    // Update player
    if (game.player) {
      game.player.update();
    }
    
    // Update and draw NPC skiers
    updateNPCSkiers();
    drawNPCSkiers();
    
    // Autoplayer logic
    autoplay.run();
    
    // Draw game elements
    drawHill();
    drawPlayer();
    
    // Check collisions
    checkCollisions();
  } else if (game.state === GameState.GAMEOVER) {
    drawGameOver();
  } else if (game.state === GameState.WON) {
    drawWinScreen();
  }
  
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
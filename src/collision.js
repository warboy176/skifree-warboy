// Collision detection logic

export function checkCollisions() {
  // Get arrays of game objects
  const player = getPlayer();
  const obstacles = getObstacleArray();
  const npcSkiers = getNpcSkierArray();

  // Check collision with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (isColliding(player, obstacle)) {
      gameOver();
      return;
    }
  }

  // Check collision with NPC skiers
  for (let i = 0; i < npcSkiers.length; i++) {
    const npcSkier = npcSkiers[i];
    if (isColliding(player, npcSkier)) {
      gameOver();
      return;
    }
  }
}

function isColliding(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

// Helper functions to get game objects (these should be implemented based on your project structure)
function getPlayer() {
  // This function should return the player object
  return player; // Assuming 'player' is defined in player.js
}

function getObstacleArray() {
  // This function should return the obstacles array
  return obstacles; // Assuming 'obstacles' is imported from obstacles.js
}

function getNpcSkierArray() {
  // This function should return the npcSkiers array
  return npcSkiers; // Assuming 'npcSkiers' is imported from npcSkiers.js
}

function gameOver() {
  game.state = GameState.GAME_OVER;
}
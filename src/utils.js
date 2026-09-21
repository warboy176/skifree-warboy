function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function spawnNPCSkiers() {
  // Randomly spawn NPC skiers
  if (Math.random() < 0.01) { // 1% chance per frame
    const lane = Math.floor(Math.random() * 3);
    const x = laneX[lane] - NPC_SKIER_WIDTH / 2;
    game.npcSkiers.push(new NPCSkier(x, -NPC_SKIER_HEIGHT));
  }

  // Remove skiers that are off screen
  game.npcSkiers = game.npcSkiers.filter(skier => skier.y < canvas.height);
}

function spawnObstacles() {
  // Randomly spawn obstacles
  if (Math.random() < 0.02) { // 2% chance per frame
    const lane = Math.floor(Math.random() * 3);
    const x = laneX[lane] - OBSTACLE_WIDTH / 2;
    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    game.obstacles.push(new Obstacle(x, -OBSTACLE_HEIGHT, type));
  }

  // Remove obstacles that are off screen
  game.obstacles = game.obstacles.filter(obstacle => obstacle.y < canvas.height);
}
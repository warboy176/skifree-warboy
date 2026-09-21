// NPC Skier logic
if (game.state === GameState.PLAYING) {
  spawnNPCSkiers();
  game.npcSkiers.forEach(skier => {
    skier.update();
    skier.draw();
  });
}

function spawnNPCSkiers() {
  const numNPCs = 5;
  for (let i = 0; i < numNPCs; i++) {
    const x = laneX[Math.floor(Math.random() * laneX.length)];
    const y = -NPC_SKIER_HEIGHT;
    const color = SKI_COLORS[Math.floor(Math.random() * SKI_COLORS.length)];
    const skier = new NPCSkier(x, y);
    skier.color = color;
    game.npcSkiers.push(skier);
  }
}

// NPC Skier class
class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = NPC_SKIER_SPEED;
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = NPC_SKIER_COLOR;
    ctx.fillRect(this.x, this.y, NPC_SKIER_WIDTH, NPC_SKIER_HEIGHT);
  }
}

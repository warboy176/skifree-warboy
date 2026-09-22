// NPC Skier logic
const NPC_SKIER_SPEED = 100; // pixels per second
const NPC_SKIER_WIDTH = 20;
const NPC_SKIER_HEIGHT = 30;
const SKI_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
const laneX = [100, 200, 300, 400]; // Example lane positions

export function updateNPCSkiers() {
  if (game.state !== GameState.PLAYING) return;

  // Spawn new NPC skiers occasionally
  if (Math.random() < 0.02) { // 2% chance per frame
    spawnNPCSkier();
  }

  // Update existing NPC skiers
  for (let i = game.npcSkiers.length - 1; i >= 0; i--) {
    const skier = game.npcSkiers[i];
    skier.update();
    
    // Remove skiers that are off-screen
    if (skier.y > canvas.height) {
      game.npcSkiers.splice(i, 1);
    }
  }
}

function spawnNPCSkier() {
  const x = laneX[Math.floor(Math.random() * laneX.length)];
  const y = -NPC_SKIER_HEIGHT;
  const color = SKI_COLORS[Math.floor(Math.random() * SKI_COLORS.length)];
  const skier = new NPCSkier(x, y);
  skier.color = color;
  game.npcSkiers.push(skier);
}

// NPC Skier class
export class NPCSkier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = NPC_SKIER_SPEED;
  }

  update() {
    this.y += this.speed * game.deltaTime;
  }

  draw() {
    ctx.fillStyle = this.color; // Use instance color
    ctx.fillRect(this.x, this.y, NPC_SKIER_WIDTH, NPC_SKIER_HEIGHT);
  }
}

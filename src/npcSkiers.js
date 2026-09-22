// NPC Skiers logic
const NPC_SKIER_SPEED = 150; // pixels per second
const NPC_SKIER_WIDTH = 20;
const NPC_SKIER_HEIGHT = 30;
const NPC_LANE_POSITIONS = [100, 200, 300, 400]; // Lane positions

let npcSkiers = [];

export function updateNPCSkiers() {
  if (game.state !== GameState.PLAYING) return;

  // Spawn new NPC skiers occasionally
  if (Math.random() < 0.005) { // 0.5% chance per frame
    spawnNPCSkier();
  }

  // Update existing NPC skiers
  for (let i = npcSkiers.length - 1; i >= 0; i--) {
    const npcSkier = npcSkiers[i];
    npcSkier.y += NPC_SKIER_SPEED * game.deltaTime;
    
    // Remove NPC skiers that are off-screen
    if (npcSkier.y > canvas.height) {
      npcSkiers.splice(i, 1);
    }
  }
}

function spawnNPCSkier() {
  const x = NPC_LANE_POSITIONS[Math.floor(Math.random() * NPC_LANE_POSITIONS.length)];
  const y = -NPC_SKIER_HEIGHT;
  const color = '#FF00FF'; // Magenta color for NPC skiers
  const npcSkier = { x, y, color };
  npcSkiers.push(npcSkier);
}

export function drawNPCSkiers() {
  npcSkiers.forEach(npcSkier => {
    ctx.fillStyle = npcSkier.color;
    ctx.fillRect(npcSkier.x, npcSkier.y, NPC_SKIER_WIDTH, NPC_SKIER_HEIGHT);
  });
}

// Export the npcSkiers array so it can be used in collision detection
export { npcSkiers as npcSkierArray };
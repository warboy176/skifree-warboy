// Obstacle logic
const OBSTACLE_SPEED = 150; // pixels per second
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 30;
const OBSTACLE_COLORS = ['#FF0000', '#00FF00', '#0000FF'];
const laneX = [100, 200, 300, 400]; // Example lane positions

let obstacles = [];

export function updateObstacles() {
  if (game.state !== GameState.PLAYING) return;

  // Spawn new obstacles occasionally
  if (Math.random() < 0.01) { // 1% chance per frame
    spawnObstacle();
  }

  // Update existing obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    obstacle.y += OBSTACLE_SPEED * game.deltaTime;
    
    // Remove obstacles that are off-screen
    if (obstacle.y > canvas.height) {
      obstacles.splice(i, 1);
    }
  }
}

function spawnObstacle() {
  const x = laneX[Math.floor(Math.random() * laneX.length)];
  const y = -OBSTACLE_HEIGHT;
  const color = OBSTACLE_COLORS[Math.floor(Math.random() * OBSTACLE_COLORS.length)];
  const obstacle = { x, y, color };
  obstacles.push(obstacle);
}

export function drawObstacles() {
  obstacles.forEach(obstacle => {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
  });
}

// Export the obstacles array so it can be used in collision detection
export { obstacles as obstacleArray };
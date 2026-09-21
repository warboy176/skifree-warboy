const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Lane positions
const laneX = [200, 400, 600];

// Ski colors
const SKI_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

// Status element
const statusEl = document.getElementById('status');

// Initialize game
function init() {
  initPlayer();
  initGame();
}

// Start the game
init();
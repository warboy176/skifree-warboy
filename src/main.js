import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config.js';
import Game from './Game.js';

// Initialize the game when the page loads
window.addEventListener('load', () => {
  const game = new Game();
});
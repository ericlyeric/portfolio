import { Game } from 'phaser/dist/phaser-arcade-physics.js';
import { GAME_CONFIG } from './utils/config';
import { resizeWindow } from './utils/helper';

window.addEventListener('load', () => {
  const game = new Game(GAME_CONFIG);
  window.addEventListener('resize', (event) => {
    resizeWindow({ window: window, game: game });
  });
  resizeWindow({ window: window, game: game });
});

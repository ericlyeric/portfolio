import { Game } from 'phaser';
import { gameConfig, resizeWindow } from './utils/config';

window.addEventListener('load', () => {
  const game = new Game(gameConfig);
  window.addEventListener('resize', (event) => {
    resizeWindow({ window: window, game: game });
  });
  resizeWindow({ window: window, game: game });
});

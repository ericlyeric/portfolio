import 'phaser';
import MainScene from '../scenes/mainScene';
import PreloadScene from '../scenes/preloadScene';
import { CONFIG } from './constants';

export const GAME_CONFIG = {
  type: Phaser.WEBGL,
  backgroundColor: '#ffffff',
  parent: 'portfolio',
  scale: {
    mode: Phaser.Scale.NONE,
    width: CONFIG.default.width,
    height: CONFIG.default.height,
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 1000 },
    },
  },
};

export const TEXT_CONFIG = {
  fontFamily: 'at01',
  fontSize: 22,
  color: 'black',
};

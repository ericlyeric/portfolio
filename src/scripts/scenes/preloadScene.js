import { IMAGES } from '../utils/constants';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this._loadImages();
    this._loadSprites();
    this._loadAudio();
  }

  _loadImages() {
    IMAGES.forEach((image) => {
      this.load.image(image, `assets/images/${image}.png`);
    });
  }

  _loadSprites() {
    this.load.spritesheet('objective', 'assets/spritesheets/coin.png', {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('player', 'assets/spritesheets/player.png', {
      frameWidth: 32,
      frameHeight: 29,
    });
    this.load.spritesheet('monte', 'assets/spritesheets/monte.png', {
      frameWidth: 43,
      frameHeight: 28,
    });
  }

  _loadAudio() {
    this.load.audio('background-song', ['assets/audio/background-song.ogg']);
    this.load.audio('footsteps', ['assets/audio/footstep.ogg']);
    this.load.audio('jump', ['assets/audio/jump.ogg']);
    this.load.audio('die', ['assets/audio/die.ogg']);
    this.load.audio('objective', ['assets/audio/objective.ogg']);
    this.load.audio('victory', ['assets/audio/victory.ogg']);
  }

  create() {
    this.scene.start('MainScene');
  }
}

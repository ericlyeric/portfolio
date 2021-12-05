export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    const images = [
      'tile-left-ground',
      'tile-middle-ground',
      'tile-right-ground',
      'tile-left-ground-fill',
      'tile-middle-ground-fill',
      'tile-right-ground-fill',
      'tile-left-ground-connect',
      'tile-right-ground-connect',
      'tile-left-float',
      'tile-middle-float',
      'tile-right-float',
      'tile-float',
      'controls',
      'background',
      'dialog-box',
      'dialog-box-big',
      'qr-code',
    ];
    images.forEach((image) => {
      this.load.image(image, `assets/images/${image}.png`);
    });

    this.load.spritesheet('objective', 'assets/spritesheets/coin.png', {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('player', 'assets/spritesheets/player.png', {
      frameWidth: 32,
      frameHeight: 29,
    });

    this.load.audio('background-song', ['assets/audio/background-song.ogg']);
    this.load.audio('footsteps', ['assets/audio/footstep.ogg']);
    this.load.audio('jump', ['assets/audio/jump.ogg']);
    this.load.audio('die', ['assets/audio/die.ogg']);
    this.load.audio('objective', ['assets/audio/objective.ogg']);
  }

  create() {
    this.scene.start('MainScene');
  }
}

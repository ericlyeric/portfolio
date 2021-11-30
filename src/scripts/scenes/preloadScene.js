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
      'goal',
    ];
    images.forEach((img) => {
      this.load.image(img, `assets/img/${img}.png`);
    });
    this.load.spritesheet('coin', 'assets/img/coin.png', {
      frameHeight: 16,
      frameWidth: 16,
    });
    this.load.spritesheet('player', 'assets/animations/player.png', {
      frameWidth: 32,
      frameHeight: 29,
    });
    this.load.audio('background-song', ['assets/audio/background-song.ogg']);
    this.load.audio('footsteps', ['assets/audio/footstep.ogg']);
    this.load.audio('jump', ['assets/audio/jump.ogg']);
  }

  create() {
    const backgroundMusic = this.sound.add('background-song', {
      volume: 0.25,
      loop: true,
    });
    backgroundMusic.play();

    this.scene.start('MainScene');
  }
}

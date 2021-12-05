class ToggleSound extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      color: '#0f0',
      fontFamily: 'at01',
      fontSize: 36,
    });

    scene.add.existing(this);
    this.setOrigin(1, 0).setScrollFactor(0);
    this.setInteractive().on('pointerdown', () => this.update(), this);
    if (scene.sound.mute) {
      this.setText('sound:off');
      this.setColor('red');
      this.scene.sound.setMute(true);
    }
  }

  adjustPosition() {
    this.setX(this.scene.cameras.main.width - 15);
    this.setY(5);
  }

  update() {
    if (this.scene.sound.mute) {
      this.setText('sound:on');
      this.setColor('#0f0');
      this.scene.sound.setMute(false);
    } else {
      this.setText('sound:off');
      this.setColor('red');
      this.scene.sound.setMute(true);
    }
  }
}

export default class Music extends Phaser.Sound.BaseSoundManager {
  constructor(scene, key, config) {
    super(scene.game);
    scene.sound.add(key, config);
    scene.sound.play(key, config);

    this.toggle = new ToggleSound(scene, 0, 0, 'sound:on');
  }
}

export default class ToggleSound extends Phaser.GameObjects.Text {
  isOn = true;
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      color: '#0f0',
      fontFamily: 'at01',
      fontSize: 36,
    });

    scene.add.existing(this);
    this.setOrigin(1, 0).setScrollFactor(0);
    this.setInteractive().on('pointerdown', () => this.update());
  }

  adjustPosition() {
    this.x = this.scene.cameras.main.width - 15;
    this.y = 5;
  }

  update() {
    this.isOn = !this.isOn;
    if (this.isOn) {
      this.setText('sound:on');
      this.setColor('#0f0');
      this.scene.sound.setMute(false);
    } else {
      this.setText('sound:off');
      this.scene.sound.setMute(true);
      this.setColor('red');
    }
  }
}

export default class Score extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      color: '#000000',
      fontSize: 24,
    });
    scene.add.existing(this);
    this.setOrigin(0, 0).setScrollFactor(0);
  }
}

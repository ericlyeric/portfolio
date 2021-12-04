export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene) {
    super(scene, 0, 0, 0, 0, 'background');
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
  }

  adjustPosition() {
    const imgHeight = 208;
    this.setScale(this.scene.cameras.main.height / imgHeight);
    this.setX(this.scene.cameras.main.centerX);
    this.setY(this.scene.cameras.main.centerY);
    this.width = this.scene.cameras.main.width;
  }

  parallax() {
    this.tilePositionX = this.scene.cameras.main.worldView.x * 0.2;
  }
}

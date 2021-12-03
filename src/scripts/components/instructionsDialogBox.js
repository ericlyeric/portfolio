export default class InstructionsDialogBox extends Phaser.GameObjects.Image {
  dialog;
  qr;

  constructor(scene, x, y, key, text) {
    super(scene, x, y, key);
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
    this.setScale(1.5);
    this.alpha = 0.65;

    this.dialog = this.scene.add.text(x, y, text, { color: 'black' });
    this.dialog.setOrigin(0.5, 0.8).setScrollFactor(0);
    this.dialog.setWordWrapWidth(this.width * 1.3);

    this.qr = scene.add.image(0, 0, 'qr-code');
    this.qr.setOrigin(0.5, 0).setScrollFactor(0);
    this.qr.setScale(0.6);
  }

  adjustPosition(scaleX, scaleY) {
    this.x = scaleX;
    this.y = scaleY;
    this.dialog.x = scaleX;
    this.dialog.y = scaleY * 0.65;
    this.qr.x = scaleX;
    this.qr.y = this.dialog.y * 1.2;
  }

  update(cursors, controls) {
    if (
      cursors.left.isDown ||
      cursors.right.isDown ||
      cursors.space.isDown ||
      controls.leftIsDown ||
      controls.rightIsDown ||
      controls.upIsDown
    ) {
      this.destroy();
      this.dialog.destroy();
      this.qr.destroy();
    }
  }
}

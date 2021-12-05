import DialogBox from './dialogBox';

export default class InstructionsDialogBox extends DialogBox {
  constructor(scene, x, y, key, text) {
    super(scene, x, y, key, text);

    this.qr = scene.add.image(0, 0, 'qr-code');
    this.qr.setOrigin(0.5, 0).setScrollFactor(0);
    this.qr.setScale(0.6);

    this.setVisible(true);
    this.dialog.setVisible(true);
    this.info.setVisible(true);
    this.close.setVisible(true);
  }

  adjustPosition(scaleX, scaleY) {
    this.setX(scaleX);
    this.setY(scaleY);
    this.dialog.setX(scaleX);
    this.dialog.setY(scaleY * 0.65);
    this.qr.setX(scaleX);
    this.qr.setY(this.dialog.y * 1.2);
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

class DialogBoxFrame extends Phaser.GameObjects.Image {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
    this.setScale(1.5);
    this.setAlpha(0.65);
  }
}

class DialogBoxImage extends Phaser.GameObjects.Image {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);

    this.setOrigin(0.5, 0).setScrollFactor(0);
    this.setScale(0.6);
    this.setAlpha(0.8);
  }
}

class DialogBoxBody extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, config, wrapFactor) {
    super(scene, x, y, text, config);
    scene.add.existing(this);

    this.setOrigin(0.5, 0.8).setScrollFactor(0);
    this.setWordWrapWidth(this.width * wrapFactor);
  }
}

export class DialogBoxLink extends DialogBoxBody {
  constructor(scene, x, y, info, config, url) {
    super(scene, x, y, info, config);
    this.setInteractive();

    this.setWordWrapWidth(this.width * 3);
    this.on('pointerdown', () => this.openExternalLink(url), this);
  }

  openExternalLink(url) {
    var s = window.open(url, '_blank');
    if (s && s.focus) {
      s.focus();
    } else if (!s) {
      window.location.href = url;
    }
  }
}

export class DialogBoxClose extends DialogBoxBody {
  constructor(scene, x, y, text, config) {
    super(scene, x, y, text, config);
    this.setInteractive();

    this.setWordWrapWidth(this.width * 3);
  }
}

export default class DialogBox {
  constructor(scene, x, y, key, text, config, info, url, wrapFactor) {
    this.frame = new DialogBoxFrame(scene, x, y, key);
    this.body = new DialogBoxBody(scene, x, y, text, config, wrapFactor);
    this.link = new DialogBoxLink(scene, x, y, info, config, url);
    this.close = new DialogBoxClose(
      scene,
      x,
      y,
      '--Click here to close--',
      config
    );
    this.close.on('pointerdown', () => this.closeDialog(), this);

    this.frame.setVisible(false);
    this.body.setVisible(false);
    this.link.setVisible(false);
    this.close.setVisible(false);
  }

  adjustPosition(scaleX, scaleY) {
    this.frame.setX(scaleX);
    this.frame.setY(scaleY);
    this.body.setX(scaleX);
    this.body.setY(scaleY);
    this.link.setX(scaleX);
    this.link.setY(scaleY * 1.3);
    this.close.setX(scaleX);
    this.close.setY(scaleY * 1.5);
  }

  closeDialog() {
    this.frame.destroy();
    this.body.destroy();
    this.link.destroy();
    this.close.destroy();
  }
}

export class DialogBoxInstructions {
  constructor(scene, x, y, key, text, config) {
    this.frame = new DialogBoxFrame(scene, x, y, key);
    this.body = new DialogBoxBody(scene, x, y, text, config);
    this.body.setWordWrapWidth(this.frame.width);
    this.qr = new DialogBoxImage(scene, x, y, 'qr-code');

    this.frame.setVisible(true);
    this.body.setVisible(true);
    this.qr.setVisible(true);
  }

  adjustPosition(scaleX, scaleY) {
    this.frame.setX(scaleX);
    this.frame.setY(scaleY);
    this.body.setX(scaleX);
    this.body.setY(scaleY * 0.65);
    this.qr.setX(scaleX);
    this.qr.setY(this.body.y * 1.3);
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
      this.frame.destroy();
      this.body.destroy();
      this.qr.destroy();
    }
  }
}

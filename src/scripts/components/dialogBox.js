export default class DialogBox extends Phaser.GameObjects.Image {
  dialog;
  info;

  constructor(scene, x, y, key, text, link) {
    super(scene, x, y, key);
    scene.add.existing(this);

    this.setOrigin(0.5).setScrollFactor(0);
    this.setScale(1.5);
    this.setAlpha(0.65);

    this.dialog = this.scene.add.text(x, y, text, {
      fontFamily: 'at01',
      fontSize: 22,
      color: 'black',
    });
    this.dialog.setOrigin(0.5, 0.8).setScrollFactor(0);
    this.dialog.setWordWrapWidth(this.width * 1.3);

    this.info = this.scene.add
      .text(x, y, link, {
        fontFamily: 'at01',
        fontSize: 22,
        color: 'black',
      })
      .setInteractive();
    this.info.setOrigin(0.5, 0.85).setScrollFactor(0);
    // this.info.on('pointerup', openExternalLink, this);
    // this.dialog.setWordWrapWidth(this.width * 1.3);

    this.close = this.scene.add.text(x, y, '--Press enter to continue--', {
      fontFamily: 'at01',
      fontSize: 22,
      color: 'black',
    });
    this.close.setOrigin(0.5, 0.85).setScrollFactor(0);
  }

  openExternalLink() {
    var tweet = 'I am testing a button from within a Phaser example';
    var url =
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet);
    var s = window.open(url, '_blank');
    if (s && s.focus) {
      s.focus();
    } else if (!s) {
      window.location.href = url;
    }
  }

  adjustPosition(scaleX, scaleY) {
    this.setX(scaleX);
    this.setY(scaleY);
    this.dialog.setX(scaleX);
    this.dialog.setY(scaleY);
    this.info.setX(scaleX);
    this.info.setY(scaleY * 1.3);
    this.close.setX(scaleX);
    this.close.setY(scaleY * 1.5);
  }
}

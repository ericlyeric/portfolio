export class Objective extends Phaser.Physics.Arcade.Sprite {
  sound;

  constructor(scene, config) {
    super(scene, config.x, config.y, config.texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable();
    this.setScale(1);
    // @ts-ignore
    this.body.setAllowGravity(false);

    scene.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNames('objective'),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.play('spin');

    this.sound = scene.sound.add('objective', {
      volume: 0.4,
      rate: 1,
    });
  }

  collect(dialogBox) {
    if (this.collecting) return;
    this.collecting = true;
    this.sound.play();
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 100,
      duration: 500,
      ease: 'Linear',
      onComplete: this.destroy.bind(this),
    });
    dialogBox.setVisible(true);
    dialogBox.dialog.setVisible(true);
    dialogBox.info.setVisible(true);
    dialogBox.close.setVisible(true);
  }
}

export default class Objectives extends Phaser.GameObjects.Group {
  counter = 0;

  constructor(scene, tiles) {
    super(scene);

    tiles.forEach((tile) => {
      this.add(new Objective(scene, tile));
    });
  }
}

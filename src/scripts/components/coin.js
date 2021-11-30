class Coin extends Phaser.Physics.Arcade.Sprite {
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
      frames: this.anims.generateFrameNames('coin'),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.play('spin');
  }

  collect() {
    if (this.collecting) return;
    this.collecting = true;
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 100,
      duration: 500,
      ease: 'Power2',
      onComplete: this.destroy.bind(this),
    });
  }
}

export default class Coins extends Phaser.GameObjects.Group {
  constructor(scene, tiles) {
    super(scene);

    tiles.forEach((tile) => {
      this.add(new Coin(scene, tile));
    });
  }
}

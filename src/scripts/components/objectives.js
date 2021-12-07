export class Objective extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, config) {
    super(scene, config.x, config.y, config.texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable();
    this.setScale(1);
    this.body.setAllowGravity(false);

    scene.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNames('objective'),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.play('spin');

    this.objective = scene.sound.add('objective', {
      volume: 0.4,
      rate: 1,
    });

    this.victory = scene.sound.add('victory', {
      volume: 0.4,
      rate: 1,
    });
  }

  collect(dialogBox, objectives, sound) {
    // animation
    if (this.collecting) return;
    this.collecting = true;
    this.objective.play();
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 100,
      duration: 500,
      ease: 'Linear',
      onComplete: this.destroy.bind(this),
    });

    // display dialog
    dialogBox.frame.setVisible(true);
    dialogBox.body.setVisible(true);
    dialogBox.link.setVisible(true);
    dialogBox.close.setVisible(true);
    if (objectives.counter >= 2) {
      sound.removeByKey('background-song');
      this.victory.play();
    }
    objectives.counter += 2;
  }
}

export default class Objectives extends Phaser.GameObjects.Group {
  constructor(scene, tiles) {
    super(scene);
    this.counter = -2;

    tiles.forEach((tile) => {
      this.add(new Objective(scene, tile));
    });
  }
}

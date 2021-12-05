export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, mapSize) {
    super(scene, player.x, player.y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.mapSize = mapSize;

    this.playerSpeed = 95;
    this.jumpSpeed = 280;
    this.footsteps;
    this.jump;
    this.die;

    this.setOrigin(0, 1);
    this.setScale(1);
    this.setSize(20, 29, true);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 6 }),
      frameRate: 0.75,
      repeat: -1,
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 1,
    });

    this.anims.create({
      key: 'fall',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 1,
    });

    this.footsteps = scene.sound.add('footsteps', {
      volume: 0.4,
      rate: 4,
    });

    this.jump = scene.sound.add('jump', {
      volume: 0.1,
      rate: 2.5,
    });

    this.die = scene.sound.add('die', {
      volume: 0.35,
      rate: 1.25,
    });
  }

  kill() {
    this._dead = true;

    // animate the camera if the player dies
    // this.scene.sound.stop = true;
    if (!this.die.isPlaying) {
      this.die.play();
    }
    this.scene.cameras.main.shake(750, 0.025);
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => this.scene.scene.restart(),
    });
  }

  update(cursors, controls, sound) {
    if (this._dead) return;

    // check if out of camera and kill
    if (
      this.body.right < this.mapSize.x ||
      this.body.left > this.mapSize.width ||
      this.body.top > this.mapSize.height
    ) {
      sound.removeByKey('background-song');
      this.kill();
    }

    if (cursors.left.isDown || controls.leftIsDown) {
      this.setVelocityX(-this.playerSpeed);
      if (this.body.onFloor()) {
        this.anims.play('run', true);
        if (!this.footsteps.isPlaying) {
          this.footsteps.play();
        }
      }
    } else if (cursors.right.isDown || controls.rightIsDown) {
      this.setVelocityX(this.playerSpeed);
      if (this.body.onFloor()) {
        this.anims.play('run', true);
        if (!this.footsteps.isPlaying) {
          this.footsteps.play();
        }
      }
    } else {
      this.setVelocityX(0);
      if (this.body.onFloor()) {
        this.anims.play('idle', true);
      }
    }

    if (this.body.velocity.y > 0 && !this.body.onFloor()) {
      this.anims.play('fall', true);
    }

    if (
      (cursors.space.isDown || cursors.up.isDown || controls.upIsDown) &&
      this.body.onFloor()
    ) {
      this.setVelocityY(-this.jumpSpeed);
      this.anims.play('jump', true);
      if (!this.jump.isPlaying) {
        this.jump.play();
      }
    }

    // If the player is moving to the right, keep them facing forward
    if (this.body.velocity.x > 0) {
      this.setFlipX(false);
    } else if (this.body.velocity.x < 0) {
      // otherwise, make them face the other side
      this.setFlipX(true);
    }
  }
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  playerSpeed = 95;
  jumpSpeed = 280;

  footsteps;
  jump;

  constructor(scene, player, mapSize) {
    super(scene, player.x, player.y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.mapSize = mapSize;

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
      mute: false,
      volume: 0.4,
      rate: 4,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });

    this.jump = scene.sound.add('jump', {
      mute: false,
      volume: 0.1,
      rate: 2.5,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    });
  }

  kill() {
    this._dead = true;

    // animate the camera if the player dies
    this.scene.cameras.main.shake(500, 0.025);
    this.scene.time.addEvent({
      delay: 500,
      callback: () => this.scene.scene.restart(),
    });
  }

  halt() {
    this.body.enable = false;
    this._halt = true;
  }

  update(cursors, controls) {
    if (this._halt || this._dead) return;

    // check if out of camera and kill
    if (
      this.body.right < this.mapSize.x ||
      this.body.left > this.mapSize.width ||
      this.body.top > this.mapSize.height
    )
      this.kill();

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
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.body.onFloor()) {
        this.anims.play('idle', true);
      }
    }

    if (this.body.velocity.y > 0 && !this.body.onFloor()) {
      this.anims.play('fall', true);
    }

    // Player can jump while walking any direction by pressing the space bar
    // or the 'UP' arrow
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

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, mapSize) {
    super(scene, player.x, player.y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.mapSize = mapSize;

    this.playerSpeed = 95;
    this.jumpSpeed = 280;
    this.footsteps = null;
    this.jump = null;
    this.die = null;
    this._dead = false;

    this.history = [];

    this.setOrigin(0, 1);
    this.setScale(1);
    this.setSize(20, 29, true);

    this._createAnimations();
    this._createSounds();
  }

  _createAnimations() {
    const ani = this.anims;
    const configs = [
      {
        key: 'idle',
        frames: ani.generateFrameNumbers('player', { start: 3, end: 6 }),
        frameRate: 0.75,
        repeat: -1,
      },
      {
        key: 'run',
        frames: ani.generateFrameNumbers('player', { start: 8, end: 15 }),
        frameRate: 8,
        repeat: -1,
      },
      { 
        key: 'jump', 
        frames: [{ key: 'player', frame: 0 }], 
        frameRate: 1 
      },
      {
        key: 'fall',
        frames: [{ key: 'player', frame: 1 }],
        frameRate: 1,
      }
    ];

    configs.forEach((c) => this.anims.create(c));
  }

  _createSounds() {
    const s = this.scene.sound;
    this.footsteps = s.add('footsteps', { volume: 0.4, rate: 4 });
    this.jump = s.add('jump', { volume: 0.1, rate: 2.5 });
    this.die = s.add('die', { volume: 0.35, rate: 1.25 });
  }

  kill() {
    this._dead = true;

    if (this.die && !this.die.isPlaying) {
      this.die.play();
    }

    this.scene.cameras.main.shake(750, 0.025);
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => this.scene.scene.restart(),
    });
  }

  playRun() {
    this.anims.play('run', true);
    if (this.footsteps && !this.footsteps.isPlaying) this.footsteps.play();
  }

  stopFootsteps() {
    if (this.footsteps && this.footsteps.isPlaying) this.footsteps.stop();
  }

  update(cursors, controls = {}, sound) {
    if (this._dead) return;

    const body = this.body;

    if (this.history.length > 60) {
      this.history.shift();
    }

    // check if out of camera and kill
    if (
      body.right < this.mapSize.x ||
      body.left > this.mapSize.width ||
      body.top > this.mapSize.height
    ) {
      if (sound && sound.removeByKey) sound.removeByKey('background-song');
      this.kill();
      return;
    }

    const leftDown = (cursors.left && cursors.left.isDown) || controls.leftIsDown;
    const rightDown = (cursors.right && cursors.right.isDown) || controls.rightIsDown;

    if (leftDown) {
      this.setVelocityX(-this.playerSpeed);
    } else if (rightDown) {
      this.setVelocityX(this.playerSpeed);
    } else {
      this.setVelocityX(0);
    }

    const jumpPressed = (cursors.space && cursors.space.isDown) || (cursors.up && cursors.up.isDown) || controls.upIsDown;
    if (jumpPressed && body.onFloor()) {
      this.setVelocityY(-this.jumpSpeed);
      if (this.jump && !this.jump.isPlaying) this.jump.play();
    }

    if (!body.onFloor()) {
      if (body.velocity.y < 0) {
        this.anims.play('jump', true); // rising
      } else {
        this.anims.play('fall', true); // descending
      }
    } else {
      if (body.velocity.x !== 0) {
        this.playRun(); // running on floor
      } else {
        this.anims.play('idle', true); // standing still
        this.stopFootsteps();
      }
    }

    if (body.velocity.x > 0) this.setFlipX(false);
    else if (body.velocity.x < 0) this.setFlipX(true);

    this.history.push({
      x: this.x,
      y: this.y,
      vx: body.velocity.x,
      vy: body.velocity.y,
      onFloor: body.onFloor(),
      flipX: this.flipX,
      anim: this.anims.currentAnim?.key
    });
  }
}

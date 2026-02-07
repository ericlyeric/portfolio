export default class Monte extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, mapSize, leader) {
    super(scene, player.x, player.y, 'monte');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.leader = leader;
    this.mapSize = mapSize;
    this.delayFrames = 5; // frames
    this.followOffset = 6; // pixels

    this.setOrigin(0, 1);
    this.setScale(0.5);
    this.setSize(31, 28, true);

    this._createAnimations();
  }

  _createAnimations() {
    const ani = this.anims;
    const configs = [
      {
        key: 'idle',
        frames: ani.generateFrameNumbers('monte', { start: 0, end: 2 }),
        frameRate: 1,
        repeat: -1,
      },
      {
        key: 'run',
        frames: ani.generateFrameNumbers('monte', { frames: [7, 5, 11] }),
        frameRate: 6,
        repeat: -1,
      },
      {
        key: 'jump',
        frames: [{ key: 'monte', frame: 4 }],
        frameRate: 1,
        repeat: -1,
      },
      {
        key: 'fall',
        frames: [{ key: 'monte', frame: 8 }],
        frameRate: 1,
        repeat: -1,
      }
    ];

    configs.forEach((c) => this.anims.create(c));
  }

  update() {
    const history = this.leader.history;

    if (!history || history.length < this.delayFrames) {
      return;
    }

    const state = history[history.length - this.delayFrames];
    const offsetX = state.flipX ? this.followOffset * 2.4 : -this.followOffset;

    this.x = Phaser.Math.Linear(this.x, state.x + offsetX, 0.35);
    this.y = Phaser.Math.Linear(this.y, state.y, 0.35);

    this.setVelocity(state.vx, state.vy);
    this.flipX = state.flipX;

    if (state.anim) {
      this.anims.play(state.anim, true);
    }  
  }
}
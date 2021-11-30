class ControlPlayer extends Phaser.GameObjects.Image {
  constructor(scene, x, y, config) {
    super(scene, y, x, 'controls');
    scene.add.existing(this);

    this.setX(x)
      .setY(y)
      .setAlpha(0.75)
      .setRotation(config.rotation)
      .setScrollFactor(0)
      .setScale(0.15);

    this.type = config.type;

    // hide control on non-touch devices
    if (!scene.sys.game.device.input.touch) this.setAlpha(0);
  }
}

export default class Controls {
  leftIsDown;
  rightIsDown;
  upIsDown;
  buttons = {};

  _width = 29;
  _height = 29;
  _scene;
  _config = [];

  constructor(scene) {
    this._scene = scene;

    this._config = [
      {
        type: 'left',
        rotation: 1.5 * Math.PI,
      },
      {
        type: 'right',
        rotation: 0.5 * Math.PI,
      },
      {
        type: 'up',
        rotation: 0,
      },
    ];
    this._config.forEach((el) => {
      this.buttons[el.type] = new ControlPlayer(scene, 0, 0, el);
    });
  }

  adjustPositions() {
    let width = this._scene.cameras.main.width;
    let height = this._scene.cameras.main.height;
    this.buttons.left.x = 22;
    this.buttons.left.y = height - 22;
    this.buttons.right.x = 22 * 3;
    this.buttons.right.y = height - 22;
    this.buttons.up.x = width - 22;
    this.buttons.up.y = height - 22;
  }

  update() {
    this.leftIsDown = false;
    this.rightIsDown = false;
    this.upIsDown = false;

    let pointers = [this._scene.input.pointer1, this._scene.input.pointer2];
    let buttons = [this.buttons.left, this.buttons.right, this.buttons.up];

    // check which pointer pressed which button
    pointers.forEach((pointer) => {
      if (pointer.isDown) {
        // console.log(pointer.x, pointer.y);
        let hit = buttons.filter((btn) => {
          let x =
            btn.x - this._width / 2 < pointer.x &&
            btn.x + this._width / 2 > pointer.x;
          let y =
            btn.y - this._height / 2 < pointer.y &&
            btn.y + this._height / 2 > pointer.y;
          return x && y;
        });
        if (hit.length === 1) {
          switch (hit[0].type) {
            case 'left':
              this.leftIsDown = true;
              break;
            case 'right':
              this.rightIsDown = true;
              break;
            case 'up':
              this.upIsDown = true;
              break;
          }
        }
      }
    });
  }
}

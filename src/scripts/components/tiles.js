class Tile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.setOrigin(0, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    // check what kind of tile
    // should only be able to jump through the float ones
    switch (texture) {
      case 'tile-left-ground':
      case 'tile-left-ground-fill':
      case 'tile-left-ground-connect':
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = true;
        this.body.checkCollision.right = false;
        break;
      case 'tile-right-ground':
      case 'tile-right-ground-fill':
      case 'tile-right-ground-connect':
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = true;
        break;
      default:
        // this allows the player to jump through a tile from below
        this.body.checkCollision.down = false;
        this.body.checkCollision.right = false;
        this.body.checkCollision.left = false;
        break;
    }
  }
}

export default class Tiles extends Phaser.GameObjects.Group {
  constructor(scene, tiles) {
    super(scene);

    tiles.forEach((tile) => {
      this.add(new Tile(scene, tile.x, tile.y, tile.texture));
    });
  }
}

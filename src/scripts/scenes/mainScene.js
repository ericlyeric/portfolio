import { Map } from '../components/map';
import Background from '../components/background';
import Tiles from '../components/tiles';
import Player from '../components/player';
import Objectives from '../components/objectives';
import Controls from '../components/controls';
import ToggleSound from '../components/toggleSound';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    const map = new Map();

    const music = this.sound.add('background-song', {
      volume: 0.25,
      loop: true,
    });
    music.play();

    this.cameras.main.setBackgroundColor('#ade6ff');
    this.cameras.main.fadeIn();

    this.cameras.main.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );
    this.physics.world.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );

    //  Input Events
    this.input.addPointer(1);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.background = new Background(this);
    this.tiles = new Tiles(
      this,
      map.info.filter((el) => el.type === 'tile')
    );
    // this.goal = new GoalSprite(this, map.info.filter((el: TilesConfig) => el.type === 'goal')[0])
    this.player = new Player(
      this,
      map.info.filter((el) => el.type === 'player')[0],
      map.size
    );
    const objectives = new Objectives(
      this,
      map.info.filter((el) => el.type === 'objective')
    );
    this.controls = new Controls(this);

    this.toggleSound = new ToggleSound(this, 0, 0, 'sound:on');

    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.tiles, this.player);

    this.physics.add.overlap(this.player, objectives, (player, objective) =>
      objective.collect()
    );

    // remove the loading screen
    let loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('transparent');
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          loadingScreen.remove();
        },
      });
    }

    // the resize function
    const resize = () => {
      this.controls.adjustPositions();
      this.toggleSound.adjustPosition();
      this.background.adjustPosition();
      // levelText.adjustPosition()
    };

    this.scale.on('resize', (gameSize) => {
      this.cameras.main.width = gameSize.width;
      this.cameras.main.height = gameSize.height;
      resize();
    });
    resize();
  }

  update() {
    this.background.parallax();
    this.controls.update();
    this.player.update(this.cursors, this.controls, this.sound);
  }
}

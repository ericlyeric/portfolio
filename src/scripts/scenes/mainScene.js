import { Map } from '../components/map';
import Background from '../components/background';
import Tiles from '../components/tiles';
import Player from '../components/player';
import Objectives from '../components/objectives';
import Controls from '../components/controls';
import ToggleSound from '../components/toggleSound';
import InstructionsDialogBox from '../components/instructionsDialogBox';
import { dialogLink, dialogText } from '../utils/dialogText';
import DialogBox from '../components/dialogBox';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    const map = new Map();

    this.physics.world.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );

    this.background = new Background(this);
    this.tiles = new Tiles(
      this,
      map.info.filter((el) => el.type === 'tile')
    );

    this.cameras.main.setBackgroundColor('#ade6ff');
    this.cameras.main.fadeIn();
    this.cameras.main.setBounds(
      map.size.x,
      map.size.y,
      map.size.width,
      map.size.height
    );

    const music = this.sound.add('background-song', {
      volume: 0.25,
      loop: true,
    });
    music.play();

    //  Input Events
    this.input.addPointer(1);
    this.cursors = this.input.keyboard.createCursorKeys();
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

    if (!this.sys.game.device.input.touch) {
      this.instructionsDialogBox = new InstructionsDialogBox(
        this,
        0,
        0,
        'dialog-box-big',
        dialogText.pc,
        dialogLink
      );
    } else {
      this.instructionsDialogBox = new InstructionsDialogBox(
        this,
        0,
        0,
        'dialog-box-big',
        dialogText.mobile
      );
    }

    this.dialogBox1 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      dialogText.objective1,
      dialogLink.objective1
    );
    this.dialogBox1.setVisible(false);
    this.dialogBox1.dialog.setVisible(false);
    this.dialogBox1.info.setVisible(false);
    this.dialogBox1.close.setVisible(false);

    this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.tiles, this.player);
    this.physics.add.overlap(this.player, objectives, (player, objective) =>
      objective.collect(this.dialogBox1)
    );

    // remove the loading screen
    let loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('transparent');
      this.time.addEvent({
        delay: 500,
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
      this.instructionsDialogBox.adjustPosition(
        this.scale.gameSize.width / 2,
        this.scale.gameSize.height / 2
      );
      this.dialogBox1.adjustPosition(
        this.scale.gameSize.width / 2,
        this.scale.gameSize.height / 2
      );
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
    this.instructionsDialogBox.update(this.cursors, this.controls);
    this.dialogBox1.update();
  }
}

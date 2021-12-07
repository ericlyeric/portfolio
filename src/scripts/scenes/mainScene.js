import { Map } from '../components/map';
import Background from '../components/background';
import Music from '../components/music';
import Tiles from '../components/tiles';
import Player from '../components/player';
import Objectives from '../components/objectives';
import Controls from '../components/controls';
import DialogBox, { DialogBoxInstructions } from '../components/dialogBox';
import { dialogInfo, dialogLink, dialogText } from '../utils/dialogText';
import { resizeObjects } from '../utils/helper';
import { textConfig } from '../utils/config';

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

    this.music = new Music(this, 'background-song', {
      volume: 0.25,
      loop: true,
    });

    //  Input Events
    this.input.addPointer(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(
      this,
      map.info.filter((el) => el.type === 'player')[0],
      map.size
    );
    this.objectives = new Objectives(
      this,
      map.info.filter((el) => el.type === 'objective')
    );
    this.controls = new Controls(this);

    if (!this.sys.game.device.input.touch) {
      this.dialogBoxInstructions = new DialogBoxInstructions(
        this,
        0,
        0,
        'dialog-box-big',
        dialogText.pc,
        textConfig
      );
    } else {
      this.dialogBoxInstructions = new DialogBoxInstructions(
        this,
        0,
        0,
        'dialog-box-big',
        dialogText.mobile,
        textConfig
      );
    }

    this.dialogBox1 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      dialogText.objective1,
      textConfig,
      dialogInfo.objective1,
      dialogLink.objective1,
      0.16
    );
    this.dialogBox2 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      dialogText.objective2,
      textConfig,
      dialogInfo.objective2,
      dialogLink.objective2,
      0.8
    );
    this.dialogBox3 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      dialogText.objective3,
      textConfig,
      dialogInfo.objective3,
      dialogLink.objective3,
      0.43
    );

    this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.tiles, this.player);

    this.physics.add.overlap(
      this.player,
      this.objectives,
      (player, objective) =>
        objective.collect(
          this[
            `dialogBox${
              this.objectives.children.entries.length + this.objectives.counter
            }`
          ],
          this.objectives,
          this.sound
        )
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

    this.scale.on('resize', (gameSize) => {
      this.cameras.main.width = gameSize.width;
      this.cameras.main.height = gameSize.height;
      resizeObjects({
        scale: this.scale,
        controls: this.controls,
        sound: this.music.toggle,
        background: this.background,
        dialogBoxInstructions: this.dialogBoxInstructions,
        dialogBox1: this.dialogBox1,
        dialogBox2: this.dialogBox2,
        dialogBox3: this.dialogBox3,
      });
    });
    resizeObjects({
      scale: this.scale,
      controls: this.controls,
      sound: this.music.toggle,
      background: this.background,
      dialogBoxInstructions: this.dialogBoxInstructions,
      dialogBox1: this.dialogBox1,
      dialogBox2: this.dialogBox2,
      dialogBox3: this.dialogBox3,
    });
  }

  update() {
    this.background.parallax();
    this.controls.update();
    this.player.update(this.cursors, this.controls, this.sound);
    this.dialogBoxInstructions.update(this.cursors, this.controls);
  }
}

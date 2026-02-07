import { Map } from '../components/map';
import Background from '../components/background';
import Music from '../components/music';
import Tiles from '../components/tiles';
import Player from '../components/player';
import Monte from '../components/monte';

import Objectives from '../components/objectives';
import Controls from '../components/controls';
import DialogBox, { DialogBoxInstructions } from '../components/dialogBox';
import { resizeObjects } from '../utils/helper';
import { TEXT_CONFIG } from '../utils/config';
import { DIALOG } from '../utils/constants';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this._initializeMap();
    this._initializeCamera();
    this._initializeControls();
    this._loadObjects();
    this._loadPhysics();

    // remove the loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('transparent');
      this.time.addEvent({ delay: 500, callback: () => loadingScreen.remove() });
    }

    this._resizeTargets = {
      scale: this.scale,
      controls: this.controls,
      sound: this.music.toggle,
      background: this.background,
      dialogBoxInstructions: this.dialogBoxInstructions,
      dialogBox1: this.dialogBox1,
      dialogBox2: this.dialogBox2,
      dialogBox3: this.dialogBox3,
    };

    this.scale.on('resize', (gameSize) => {
      this.cameras.main.width = gameSize.width;
      this.cameras.main.height = gameSize.height;
      resizeObjects(this._resizeTargets);
    });

    // initial resize
    resizeObjects(this._resizeTargets);
  }

  _initializeMap() {
    this.map = new Map();
    this.physics.world.setBounds(
      this.map.size.x,
      this.map.size.y,
      this.map.size.width,
      this.map.size.height
    );
    this.background = new Background(this);
    this.tiles = new Tiles(
      this,
      this.map.info.filter((el) => el.type === 'tile')
    );
    this.music = new Music(this, 'background-song', {
      volume: 0.25,
      loop: true,
    });    
  }

  _initializeCamera() {
    this.cameras.main.setBackgroundColor('#ade6ff');
    this.cameras.main.fadeIn();
    this.cameras.main.setBounds(
      this.map.size.x,
      this.map.size.y,
      this.map.size.width,
      this.map.size.height
    );
  }

  _initializeControls() {
    this.input.addPointer(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Controls(this);
  }

  _loadObjects() {
    this.player = new Player(
      this,
      this.map.info.filter((el) => el.type === 'player')[0],
      this.map.size
    );
    this.monte = new Monte(
      this,
      this.map.info.filter((el) => el.type === 'monte')[0],
      this.map.size,
      this.player
    )
    this.objectives = new Objectives(
      this,
      this.map.info.filter((el) => el.type === 'objective')
    );
    this._loadDialogs();
  }

  _loadDialogs() {
    if (!this.sys.game.device.input.touch) {
      this.dialogBoxInstructions = new DialogBoxInstructions(
        this,
        0,
        0,
        'dialog-box-big',
        DIALOG.text.pc,
        TEXT_CONFIG
      );
    } else {
      this.dialogBoxInstructions = new DialogBoxInstructions(
        this,
        0,
        0,
        'dialog-box-big',
        DIALOG.text.mobile,
        TEXT_CONFIG
      );
    }

    this.dialogBox1 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      DIALOG.text.objective1,
      TEXT_CONFIG,
      DIALOG.info.objective1,
      DIALOG.link.objective1,
      0.36
    );
    this.dialogBox2 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      DIALOG.text.objective2,
      TEXT_CONFIG,
      DIALOG.info.objective2,
      DIALOG.link.objective2,
      0.8
    );
    this.dialogBox3 = new DialogBox(
      this,
      0,
      0,
      'dialog-box-big',
      DIALOG.text.objective3,
      TEXT_CONFIG,
      DIALOG.info.objective3,
      DIALOG.link.objective3,
      0.40
    );
  }

  _loadPhysics() {
    this.cameras.main.startFollow(this.player);
    this.physics.add.collider(this.tiles, this.player);
    this.physics.add.collider(this.tiles, this.monte);

    this.physics.add.overlap(
      this.player,
      this.objectives,
      (_, objective) =>
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
  }

  update() {
    this.background.parallax();
    this.controls.update();
    this.player.update(this.cursors, this.controls, this.sound);
    this.monte.update();
    this.dialogBoxInstructions.update(this.cursors, this.controls);
  }
}

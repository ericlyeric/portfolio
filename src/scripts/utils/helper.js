import { CONFIG } from './constants';

export const resizeWindow = ({ window, game }) => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const WIDTH = CONFIG.default.width;
  const HEIGHT = CONFIG.default.height;
  const MAX_WIDTH = CONFIG.max.width;
  const MAX_HEIGHT = CONFIG.max.height;

  let scale = Math.min(w / WIDTH, h / HEIGHT);
  let newWidth = Math.min(w / scale, MAX_WIDTH);
  let newHeight = Math.min(h / scale, MAX_HEIGHT);
  let defaultRatio = WIDTH / HEIGHT;
  let maxRatioWidth = MAX_WIDTH / HEIGHT;
  let maxRatioHeight = WIDTH / MAX_HEIGHT;

  // smooth scaling
  let smooth = 1;
  if (CONFIG.scaleMode === 'SMOOTH') {
    const maxSmoothScale = 1.15;
    const normalize = (value, min, max) => {
      return (value - min) / (max - min);
    };
    if (WIDTH / HEIGHT < w / h) {
      smooth =
        -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
          (1 / (maxSmoothScale - 1)) +
        maxSmoothScale;
    } else {
      smooth =
        -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
          (1 / (maxSmoothScale - 1)) +
        maxSmoothScale;
    }
  }

  // resize the game
  game.scale.resize(newWidth * smooth, newHeight * smooth);

  // scale the width and height of the css
  game.canvas.style.width = newWidth * scale + 'px';
  game.canvas.style.height = newHeight * scale + 'px';

  // center the game with css margin
  game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
  game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
};

export const resizeObjects = ({
  scale,
  controls,
  sound,
  background,
  dialogBoxInstructions,
  dialogBox1,
  dialogBox2,
  dialogBox3,
}) => {
  controls.adjustPosition();
  sound.adjustPosition();
  background.adjustPosition();
  dialogBoxInstructions.adjustPosition(
    scale.gameSize.width / 2,
    scale.gameSize.height / 2
  );
  dialogBox1.adjustPosition(
    scale.gameSize.width / 2,
    scale.gameSize.height / 2
  );
  dialogBox2.adjustPosition(
    scale.gameSize.width / 2,
    scale.gameSize.height / 2
  );
  dialogBox3.adjustPosition(
    scale.gameSize.width / 2,
    scale.gameSize.height / 2
  );
};

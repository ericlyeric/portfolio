// the resize function
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

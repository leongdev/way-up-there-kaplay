import { k } from "./kaplay";

export enum InputMethod {
  DOWN = "down",
  PRESS = "press",
}

export const InputConfig = {
  left: ["left", "a"],
  right: ["right", "d"],
  up: ["up", "w"],
  down: ["down", "s"],
};

export const isKeyHorizontalDown = () => {
  const isLeftDown =
    k.isKeyDown(InputConfig.left[0]) || k.isKeyDown(InputConfig.left[1]);

  const isRightDown =
    k.isKeyDown(InputConfig.right[0]) || k.isKeyDown(InputConfig.right[1]);

  return isLeftDown || isRightDown;
};

export const isKeyVerticalDown = () => {
  const isUpDown =
    k.isKeyDown(InputConfig.up[0]) || k.isKeyDown(InputConfig.up[1]);

  const isDownDown =
    k.isKeyDown(InputConfig.down[0]) || k.isKeyDown(InputConfig.down[1]);

  return isUpDown || isDownDown;
};

export const onInputHorizontal = (
  onPress: () => void,
  onRelease: () => void,
  type: InputMethod = InputMethod.DOWN
) => {
  onInputLeft(onPress, onRelease, type);
  onInputRight(onPress, onRelease, type);
};

export const onInputVertical = (
  onPress: () => void,
  onRelease: () => void,
  type: InputMethod = InputMethod.DOWN
) => {
  onInputUp(onPress, onRelease, type);
  onInputDown(onPress, onRelease, type);
};

export const onInputUp = (
  onPress: () => void,
  onRelease: () => void = () => {},
  type: InputMethod = InputMethod.DOWN
) => {
  InputConfig.up.forEach((key) => {
    if (type === InputMethod.PRESS) {
      k.onKeyPress(key, onPress);
    } else {
      k.onKeyDown(key, onPress);
    }

    k.onKeyRelease(key, onRelease);
  });
};

export const onInputDown = (
  onPress: () => void,
  onRelease: () => void = () => {},
  type: InputMethod = InputMethod.DOWN
) => {
  InputConfig.down.forEach((key) => {
    if (type === InputMethod.PRESS) {
      k.onKeyPress(key, onPress);
    } else {
      k.onKeyDown(key, onPress);
    }

    k.onKeyRelease(key, onRelease);
  });
};

export const onInputLeft = (
  onPress: () => void,
  onRelease: () => void = () => {},
  type: InputMethod = InputMethod.DOWN
) => {
  InputConfig.left.forEach((key) => {
    if (type === InputMethod.PRESS) {
      k.onKeyPress(key, onPress);
    } else {
      k.onKeyDown(key, onPress);
    }

    k.onKeyRelease(key, onRelease);
  });
};

export const onInputRight = (
  onPress: () => void,
  onRelease: () => void = () => {},
  type: InputMethod = InputMethod.DOWN
) => {
  InputConfig.right.forEach((key) => {
    if (type === InputMethod.PRESS) {
      k.onKeyPress(key, onPress);
    } else {
      k.onKeyDown(key, onPress);
    }
    k.onKeyRelease(key, onRelease);
  });
};

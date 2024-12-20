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
  fire: ["space", "e"],
};

export const isKeyHorizontalDown = () => {
  const horizontalKeys = [...InputConfig.left, ...InputConfig.right];
  return horizontalKeys.some((key) => k.isKeyDown(key));
};

export const isKeyVerticalDown = () => {
  const verticalKeys = [...InputConfig.up, ...InputConfig.down];
  return verticalKeys.some((key) => k.isKeyDown(key));
};

export const onInput = (
  onPress: () => void,
  onRelease: () => void = () => {},
  type: InputMethod = InputMethod.DOWN,
  keys: Array<string>
) => {
  keys.forEach((key) => {
    if (type === InputMethod.PRESS) {
      k.onKeyPress(key, onPress);
    } else {
      k.onKeyDown(key, onPress);
    }

    k.onKeyRelease(key, onRelease);
  });
};

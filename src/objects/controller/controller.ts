import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { controllerConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../settings/inputs";

let IS_COLLIDING_PLAYER: boolean = false;
let IS_CONTROLLING_SHIP: boolean = false;
let PRESSING_LEFT: boolean = false;
let PRESSING_RIGHT: boolean = false;

export const getController = (position: Vec2) => {
  k.loadSprite(Objects.CONTROLLER, "sprites/controller.png", controllerConfig);

  const controller = k.add([
    k.sprite(Objects.CONTROLLER),
    pos(position),
    area(),
    z(0),
    Objects.CONTROLLER,
  ]);

  controller.play("idle");

  controller.onCollide(Objects.PLAYER, () => {
    IS_COLLIDING_PLAYER = true;
  });

  controller.onCollide(Objects.PLAYER, () => {
    controller.play("outline");
  });

  controller.onCollideEnd(Objects.PLAYER, () => {
    IS_COLLIDING_PLAYER = false;
    controller.play("idle");
  });

  onInput(
    () => {
      if (IS_COLLIDING_PLAYER) {
        IS_CONTROLLING_SHIP = true;
        controller.trigger(Events.ON_ENABLE_CONTROL_SHIP);
      }
    },
    () => {
      IS_CONTROLLING_SHIP = false;
      controller.trigger(Events.ON_DISABLE_CONTROL_SHIP);
    },
    InputMethod.PRESS,
    InputConfig.fire
  );

  onInput(
    () => {
      if (IS_COLLIDING_PLAYER) {
        IS_CONTROLLING_SHIP = true;
      }
    },
    () => {
      if (IS_COLLIDING_PLAYER) {
        IS_CONTROLLING_SHIP = false;
      }
    },
    InputMethod.DOWN,
    InputConfig.fire
  );

  onInput(
    () => {
      if (IS_CONTROLLING_SHIP) {
        controller.play("left");
      }

      PRESSING_LEFT = true;
    },
    () => {
      if (IS_CONTROLLING_SHIP && !PRESSING_RIGHT) {
        controller.play("outline");
      }

      PRESSING_LEFT = false;
    },
    InputMethod.PRESS,
    InputConfig.left
  );

  onInput(
    () => {
      if (IS_CONTROLLING_SHIP) {
        controller.play("right");
      }

      PRESSING_RIGHT = true;
    },
    () => {
      if (IS_CONTROLLING_SHIP && !PRESSING_LEFT) {
        controller.play("outline");
      }

      PRESSING_RIGHT = false;
    },
    InputMethod.PRESS,
    InputConfig.right
  );

  return controller;
};

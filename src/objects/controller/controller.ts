import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { controllerConfig } from "./config";

let IS_COLLIDING_PLAYER: boolean = false;

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

  controller.onCollideEnd(Objects.PLAYER, () => {
    IS_COLLIDING_PLAYER = false;
  });

  controller.onCollide(Objects.PLAYER, () => {
    controller.play("outline");
  });

  controller.onCollideEnd(Objects.PLAYER, () => {
    controller.play("idle");
  });

  k.on(Events.ON_MOVE_SHIP_LEFT, Objects.PLAYER, () => {
    controller.play("left");
  });

  k.on(Events.ON_MOVE_SHIP_RIGHT, Objects.PLAYER, () => {
    controller.play("right");
  });

  k.on(Events.ON_DISABLE_CONTROL_SHIP, Objects.PLAYER, () => {
    if (IS_COLLIDING_PLAYER) controller.play("outline");
  });

  return controller;
};

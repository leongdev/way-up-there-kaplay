import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { shipConfig } from "./config";

const SPEED = 150;

export const getShip = (position: Vec2) => {
  k.loadSprite(Objects.SHIP, "sprites/spaceship.png", shipConfig);

  const ship = k.add([
    k.sprite(Objects.SHIP),
    pos(position),
    area(),
    body(),
    z(1),
    Objects.SHIP,
  ]);

  ship.play("idle");

  ship.gravityScale = 0;

  k.on(Events.ON_MOVE_SHIP_LEFT, Objects.PLAYER, () => {
    ship.move(-SPEED, 0);
  });

  k.on(Events.ON_MOVE_SHIP_RIGHT, Objects.PLAYER, () => {
    ship.move(SPEED, 0);
  });

  return ship;
};

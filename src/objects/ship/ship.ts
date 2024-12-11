import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { shipConfig } from "./config";

const SPEED = 50;

export const getShip = (position: Vec2, direction: number) => {
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

  if (direction === 1) {
    ship.move(SPEED, 0);
  } else if (direction === -1) {
    ship.move(-SPEED, 0);
  }

  return ship;
};

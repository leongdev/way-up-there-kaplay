import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { FIRING_DELAY } from "../../utils/constants";
import { Events, Objects } from "../../utils/types";
import { ProjectileTypes } from "../projectile/config";
import { getProjectile } from "../projectile/projectile";
import { shipConfig, ShipFiringTypes } from "./config";

const SPEED = 150;

let FIRE_TYPE = ShipFiringTypes.A;
let IS_FIRING: boolean = false;
let FIRE_DIRECTION: boolean = false;
let CAN_FIRE: boolean = true;

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

  const firing_timer = add([timer()]);

  firing_timer.loop(FIRING_DELAY, () => {
    if (IS_FIRING && CAN_FIRE) {
      FIRE_DIRECTION = !FIRE_DIRECTION;

      if (FIRE_DIRECTION) {
        getProjectile(
          SPEED,
          vec2(ship.pos.x + 7, ship.pos.y - 6),
          ProjectileTypes.A
        );
      } else {
        getProjectile(
          SPEED,
          vec2(ship.pos.x + 25, ship.pos.y - 6),
          ProjectileTypes.A
        );
      }
    }
  });

  k.on(Events.ON_RUN_OUT_OF_ENERGY, Objects.FUEL_CELL_INDICATOR, () => {
    CAN_FIRE = false;
    ship.play("idle");
  });

  k.on(Events.ON_ENABLE_CONTROL_SHIP, Objects.PLAYER, () => {
    if (CAN_FIRE) {
      IS_FIRING = true;
      ship.play(FIRE_TYPE);
    }
  });

  k.on(Events.ON_DISABLE_CONTROL_SHIP, Objects.PLAYER, () => {
    IS_FIRING = false;
    ship.play("idle");
  });

  k.on(Events.ON_MOVE_SHIP_LEFT, Objects.PLAYER, () => {
    ship.move(-SPEED, 0);
  });

  k.on(Events.ON_MOVE_SHIP_RIGHT, Objects.PLAYER, () => {
    ship.move(SPEED, 0);
  });

  return ship;
};

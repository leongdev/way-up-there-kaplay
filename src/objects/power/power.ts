import { GameObj } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { consumableConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../settings/inputs";

let canDock: boolean = false;
let collidedObj: GameObj;

export const getPower = (position) => {
  k.loadSprite(Objects.POWER, "sprites/power.png", consumableConfig);

  const consumable = k.add([
    sprite(Objects.POWER),
    pos(position),
    z(2),
    area(),
    body(),
    anchor("bot"),
    Objects.POWER,
  ]);

  consumable.play("idle");

  consumable.onCollide(Objects.COLLIDER_GROUND, (obj: GameObj) => {
    const lastPosition = new Vec2(consumable.pos.x, obj.pos.y);
    consumable.destroy();
    getConsumableGround(lastPosition, Objects.POWER);
  });

  return consumable;
};

const getConsumableGround = (position, type) => {
  const consumable = k.add([
    sprite(type),
    pos(position),
    z(2),
    area(),
    body({ isStatic: true }),
    anchor("bot"),
    platformEffector({}),
    type,
  ]);

  consumable.play("idle");

  k.onCollide(type, Objects.PLAYER, (obj: GameObj) => {
    obj.play("outline");
    canDock = true;
    collidedObj = obj;
  });

  k.onCollideEnd(type, Objects.PLAYER, (obj: GameObj) => {
    obj.play("idle");
    canDock = false;
  });

  onInput(
    () => {
      if (canDock && collidedObj) {
        k.destroy(collidedObj);
        consumable.trigger(Events.ON_DOCK_POWER);
        canDock = false;
      }
    },
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );
};

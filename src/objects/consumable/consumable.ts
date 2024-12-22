import { GameObj } from "kaplay";
import { k } from "../../settings/kaplay";
import { ConsumableTypes, Events, Objects } from "../../utils/types";
import { consumableConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../settings/inputs";

let canDock: boolean = false;
let collidedObj: GameObj;

export const getConsumable = (position, src: string, type: ConsumableTypes) => {
  k.loadSprite(type, src, consumableConfig);

  const consumable = k.add([
    sprite(type),
    pos(position),
    z(2),
    area(),
    body(),
    anchor("bot"),
    type,
  ]);

  consumable.play("idle");

  consumable.onCollide(Objects.COLLIDER, (obj: GameObj) => {
    const lastPosition = new Vec2(consumable.pos.x, obj.pos.y);
    consumable.destroy();
    getConsumableGround(lastPosition, type);
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
        onDockConsumable(type, consumable);
        canDock = false;
      }
    },
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );
};

const onDockConsumable = (type: ConsumableTypes, consumable: GameObj) => {
  switch (type) {
    case ConsumableTypes.CRYSTAL:
      consumable.trigger(Events.ON_DOCK_CRYSTAL);
      break;
    case ConsumableTypes.POWER:
      consumable.trigger(Events.ON_DOCK_POWER);
      break;
    default:
      break;
  }
};

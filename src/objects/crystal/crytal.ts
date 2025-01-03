import { GameObj, Vec2 as V2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { consumableConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../settings/inputs";

let canDock: boolean = false;
let collidedObj: GameObj;

export const getCrystal = (position: V2) => {
  k.loadSprite(Objects.CRYSTAL, "sprites/crystal.png", consumableConfig);

  const consumable = k.add([
    sprite(Objects.CRYSTAL),
    pos(position),
    z(2),
    area(),
    body(),
    anchor("bot"),
    Objects.CRYSTAL,
  ]);

  consumable.play("idle");

  consumable.onCollide(Objects.COLLIDER_GROUND, (obj: GameObj) => {
    const lastPosition = new Vec2(consumable.pos.x, obj.pos.y);
    consumable.destroy();
    getConsumableGround(lastPosition, Objects.CRYSTAL);
  });

  return consumable;
};

const getConsumableGround = (position: V2, type: any) => {
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
        consumable.trigger(Events.ON_DOCK_CRYSTAL);
        canDock = false;
      }
    },
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );
};

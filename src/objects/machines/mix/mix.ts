import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Objects } from "../../../utils/types";
import { mixConfig } from "./config";

let isBuildingFuel = false;

export const getMixMachine = (position: Vec2) => {
  k.loadSprite(Objects.MIX_MACHINE, "sprites/mix_machine.png", mixConfig);

  const mixMachine = k.add([
    k.sprite(Objects.MIX_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.MIX_MACHINE,
  ]);

  mixMachine.play("idle");

  mixMachine.onCollide(Objects.PLAYER, () => {
    if (!isBuildingFuel) mixMachine.play("outline");
  });

  mixMachine.onCollideEnd(Objects.PLAYER, () => {
    if (!isBuildingFuel) mixMachine.play("idle");
  });

  return mixMachine;
};

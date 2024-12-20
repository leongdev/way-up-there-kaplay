import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig } from "./config";

export const getPowerPrinter = (position: Vec2) => {
  k.loadSprite(
    Objects.PRINT_MACHINE,
    "sprites/print_machine_2.png",
    printConfig
  );

  const power = k.add([
    k.sprite(Objects.PRINT_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.PRINT_MACHINE,
  ]);

  power.play("idle");

  power.onCollide(Objects.PLAYER, () => {
    power.play("outline");
  });

  power.onCollideEnd(Objects.PLAYER, () => {
    power.play("idle");
  });

  k.on(Events.ON_PRINT_ITEM_SELECTED, Objects.PLAYER, () => {
    power.play("idle");
  });

  return power;
};

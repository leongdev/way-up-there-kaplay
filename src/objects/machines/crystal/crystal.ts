import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig } from "./config";

export const getCrystalPrinter = (position: Vec2) => {
  k.loadSprite(Objects.PRINT_MACHINE, "sprites/print_machine.png", printConfig);

  const crystal = k.add([
    k.sprite(Objects.PRINT_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.PRINT_MACHINE,
  ]);

  crystal.play("idle");

  crystal.onCollide(Objects.PLAYER, () => {
    crystal.play("outline");
  });

  crystal.onCollideEnd(Objects.PLAYER, () => {
    crystal.play("idle");
  });

  k.on(Events.ON_PRINT_ITEM_SELECTED, Objects.PLAYER, () => {
    crystal.play("idle");
  });

  return crystal;
};

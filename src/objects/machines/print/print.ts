import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Objects } from "../../../utils/types";
import { printConfig } from "./config";

export const getPrinter = (position: Vec2) => {
  k.loadSprite(Objects.PRINT_MACHINE, "sprites/print_machine.png", printConfig);

  const printMachine = k.add([
    k.sprite(Objects.PRINT_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.PRINT_MACHINE,
  ]);

  printMachine.play("idle");

  printMachine.onCollide(Objects.PLAYER, () => {
    printMachine.play("outline");
  });

  printMachine.onCollideEnd(Objects.PLAYER, () => {
    printMachine.play("idle");
  });

  return printMachine;
};

import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";

let canEnablePrint: boolean = false;

export const getCrystalPrinter = (position: Vec2) => {
  k.loadSprite(
    Objects.PRINT_CRYSTAL_MACHINE,
    "sprites/print_machine.png",
    printConfig
  );

  const crystal = k.add([
    k.sprite(Objects.PRINT_CRYSTAL_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.PRINT_CRYSTAL_MACHINE,
  ]);

  crystal.play("idle");

  crystal.onCollide(Objects.PLAYER, () => {
    canEnablePrint = true;
    crystal.play("outline");
  });

  crystal.onCollideEnd(Objects.PLAYER, () => {
    canEnablePrint = false;
    crystal.play("idle");
  });

  onInput(
    () => {
      if (canEnablePrint) {
        crystal.trigger(Events.ON_ENABLE_CRYSTAL_PRINT_MACHINE);
      }
    },
    () => {
      if (canEnablePrint) {
        crystal.trigger(Events.ON_DISABLE_CRYSTAL_PRINT_MACHINE);
      }
    },
    InputMethod.DOWN,
    InputConfig.fire
  );

  return crystal;
};

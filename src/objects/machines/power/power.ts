import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";

let canEnablePrint: boolean = false;

export const getPowerPrinter = (position: Vec2) => {
  k.loadSprite(
    Objects.PRINT_POWER_MACHINE,
    "sprites/print_machine_2.png",
    printConfig
  );

  const power = k.add([
    k.sprite(Objects.PRINT_POWER_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.PRINT_POWER_MACHINE,
  ]);

  power.play("idle");

  power.onCollide(Objects.PLAYER, () => {
    canEnablePrint = true;
    power.play("outline");
  });

  power.onCollideEnd(Objects.PLAYER, () => {
    canEnablePrint = false;
    power.play("idle");
  });

  onInput(
    () => {
      if (canEnablePrint) {
        power.trigger(Events.ON_ENABLE_POWER_PRINT_MACHINE);
      }
    },
    () => {
      if (canEnablePrint) {
        power.trigger(Events.ON_DISABLE_POWER_PRINT_MACHINE);
      }
    },
    InputMethod.DOWN,
    InputConfig.fire
  );
  return power;
};

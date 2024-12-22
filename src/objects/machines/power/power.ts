import { Vec2 as Vector2D } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";
import { getProgress } from "../../ui/progress/progress";

let canEnablePrint: boolean = false;
let canPrint: boolean = true;

export const getPowerPrinter = (position: Vector2D) => {
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

  const progress = getProgress(new Vec2(power.pos.x, power.pos.y - 10), () => {
    progress.hidden = true;
    power.trigger(Events.ON_FINISH_PRINT_POWER);
    power.play("idle");
  });

  power.play("idle");

  power.onCollide(Objects.PLAYER, () => {
    canEnablePrint = true;
    power.play("outline");
  });

  power.onCollideEnd(Objects.PLAYER, () => {
    canEnablePrint = false;
    power.play("idle");
  });

  k.on(Events.ON_HAS_POWER, Objects.PLAYER, () => {
    canPrint = false;
  });

  k.on(Events.ON_REMOVE_POWER, Objects.PLAYER, () => {
    canPrint = true;
  });

  onInput(
    () => {
      if (canEnablePrint && canPrint) {
        progress.hidden = false;
        progress.play("progress");
        power.trigger(Events.ON_START_PRINT_POWER);
        power.play("printPower");
        canPrint = false;
      }
    },
    () => {},
    InputMethod.DOWN,
    InputConfig.fire
  );
  return power;
};

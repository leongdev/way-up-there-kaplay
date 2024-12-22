import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";
import { getProgress } from "../../ui/progress/progress";
import { Vec2 as Vector2 } from "kaplay";

let canEnablePrint: boolean = false;
let canPrint: boolean = true;

export const getCrystalPrinter = (position: Vector2) => {
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

  const progress = getProgress(
    new Vec2(crystal.pos.x, crystal.pos.y - 10),
    () => {
      progress.hidden = true;
      crystal.trigger(Events.ON_FINISH_PRINT_CRYSTAL);
      crystal.play("idle");
    }
  );

  crystal.play("idle");

  crystal.onCollide(Objects.PLAYER, () => {
    canEnablePrint = true;
    crystal.play("outline");
  });

  crystal.onCollideEnd(Objects.PLAYER, () => {
    canEnablePrint = false;
    crystal.play("idle");
  });

  k.on(Events.ON_HAS_CRYSTAL, Objects.PLAYER, () => {
    canPrint = false;
  });

  k.on(Events.ON_REMOVE_CRYSTAL, Objects.PLAYER, () => {
    canPrint = true;
  });

  onInput(
    () => {
      if (canEnablePrint && canPrint) {
        progress.hidden = false;
        progress.play("progress");
        crystal.trigger(Events.ON_START_PRINT_CRYSTAL);
        crystal.play("printCrystal");
        canPrint = false;
      }
    },
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );

  return crystal;
};

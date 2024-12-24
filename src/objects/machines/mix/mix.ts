import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { mixConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";
import { getProgress } from "../../ui/progress/progress";
import { Vec2 as Vector2D } from "kaplay";
import { consumableConfig } from "../../crystal/config";

let canUploadItem: boolean = false;
let hasCrystal: boolean = false;
let hasPower: boolean = false;

export const getMixMachine = (position: Vector2D) => {
  k.loadSprite(Objects.MIX_MACHINE, "sprites/mix_machine.png", mixConfig);
  k.loadSprite(Objects.MIX_DISPLAY, "sprites/ItemDisplay.png");
  k.loadSprite(Objects.CRYSTAL, "sprites/crystal.png", consumableConfig);
  k.loadSprite(Objects.POWER, "sprites/power.png", consumableConfig);

  //Load Image
  k.add([
    k.sprite(Objects.MIX_DISPLAY),
    pos(position.x + 36, position.y - 10),
    area(),
    z(0),
    Objects.MIX_DISPLAY,
  ]);

  const mixMachine = k.add([
    k.sprite(Objects.MIX_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.MIX_MACHINE,
  ]);

  const crystal = k.add([
    k.sprite(Objects.CRYSTAL),
    pos(position.x + 37, position.y - 9),
    area(),
    z(0),
    Objects.CRYSTAL,
  ]);

  const power = k.add([
    k.sprite(Objects.POWER),
    pos(position.x + 52, position.y - 9),
    area(),
    z(0),
    Objects.CRYSTAL,
  ]);

  const progress = getProgress(new Vec2(position.x, position.y - 10), () => {
    progress.hidden = true;
    crystal.hidden = true;
    power.hidden = true;

    mixMachine.trigger(Events.ON_MIX_FINISH);
  });

  crystal.hidden = true;
  power.hidden = true;

  crystal.play("idle");
  power.play("idle");

  mixMachine.play("idle");

  mixMachine.onCollide(Objects.PLAYER, () => {
    canUploadItem = true;
    mixMachine.play("outline");
    mixMachine.trigger(Events.ON_ENABLE_UPLOAD);
  });

  mixMachine.onCollideEnd(Objects.PLAYER, () => {
    canUploadItem = false;
    mixMachine.play("idle");
    mixMachine.trigger(Events.ON_DISABLE_UPLOAD);
  });

  k.on(Events.ON_UPLOAD_CRYSTAL, Objects.PLAYER, () => {
    if (!hasCrystal) {
      crystal.hidden = false;
      hasCrystal = true;
    }
  });

  k.on(Events.ON_UPLOAD_POWER, Objects.PLAYER, () => {
    if (!hasPower) {
      power.hidden = false;
      hasPower = true;
    }
  });

  k.on(Events.ON_UPLOAD_ITEM, Objects.MIX_MACHINE, () => {
    if (hasCrystal && hasPower) {
      hasPower = false;
      hasCrystal = false;

      progress.hidden = false;

      progress.play("progress");
      mixMachine.play("building");

      mixMachine.trigger(Events.ON_MIX_START);
    }
  });

  onInput(
    () => {
      if (canUploadItem) {
        mixMachine.trigger(Events.ON_UPLOAD_ITEM, {
          crystalLocked: hasCrystal,
          powerLocked: hasPower,
        });
      }
    },
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );

  return mixMachine;
};

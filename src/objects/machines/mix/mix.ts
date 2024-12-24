import { k } from "../../../settings/kaplay";
import { Objects } from "../../../utils/types";
import { mixConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";
import { getProgress } from "../../ui/progress/progress";
import { Vec2 as Vector2D } from "kaplay";
import { consumableConfig } from "../../crystal/config";

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
    // TODO: What happens when is finished
  });

  crystal.hidden = true;
  power.hidden = true;

  crystal.play("idle");
  power.play("idle");

  mixMachine.play("idle");

  mixMachine.onCollide(Objects.PLAYER, () => {
    mixMachine.play("outline");
  });

  mixMachine.onCollideEnd(Objects.PLAYER, () => {
    mixMachine.play("idle");
  });

  onInput(
    () => {},
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );

  return mixMachine;
};

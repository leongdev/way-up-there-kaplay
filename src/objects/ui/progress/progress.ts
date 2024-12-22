import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Objects } from "../../../utils/types";
import { progressConfig } from "./config";

export const getProgress = (position: Vec2, onFinish: () => void) => {
  k.loadSprite(Objects.PROGRESS, "sprites/progress_bar.png", progressConfig);

  const progress = k.add([
    k.sprite(Objects.PROGRESS),
    pos(position),
    area(),
    z(0),
    Objects.PROGRESS,
  ]);

  progress.hidden = true;

  progress.play("idle");

  progress.onAnimEnd((anim: string) => {
    if (anim === "progress") {
      onFinish();
    }
  });

  return progress;
};

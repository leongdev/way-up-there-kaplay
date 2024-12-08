import { Vec2 } from "kaplay";
import { k } from "../settings/kaplay";

export const useBackground = (sprite: string, pos: Vec2, src: string) => {
  k.loadSprite(sprite, src);

  k.onDraw(() => {
    k.drawSprite({
      sprite,
      pos,
    });
  });
};

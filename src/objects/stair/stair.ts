import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";

export const getStair = (position: Vec2, src: string) => {
  k.loadSprite(Objects.STAIR, src);

  return k.add([
    k.sprite(Objects.STAIR),
    pos(position),
    area(),
    z(0),
    Objects.STAIR,
  ]);
};

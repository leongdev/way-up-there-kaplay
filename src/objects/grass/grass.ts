import { GameObj, Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { GrassConfig, grassConfigA, grassConfigB } from "./config";

export enum GrassType {
  A,
  B,
}

export const getGrass = (
  position: Vec2,
  type: GrassType,
  player: GameObj
): GameObj => {
  switch (type) {
    case GrassType.A:
      return loadGrass(
        position,
        "sprites/grass_a.png",
        grassConfigA,
        player,
        Objects.GRASS_A
      );
    case GrassType.B:
      return loadGrass(
        position,
        "sprites/grass_b.png",
        grassConfigB,
        player,
        Objects.GRASS_B
      );
  }
};

const loadGrass = (
  position: Vec2,
  src: string,
  config: GrassConfig,
  player: GameObj,
  tag: string
) => {
  k.loadSprite(tag, src, config);
  const grass = k.add([k.sprite(tag), pos(position), area(), z(1), tag]);

  grass.play("idle");

  player.onCollide(tag, () => {
    grass.play("move");
  });

  grass.onAnimEnd((animation) => {
    if (animation === "move") grass.play("idle");
  });

  return grass;
};

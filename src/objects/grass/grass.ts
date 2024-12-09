import { GameObj, Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import {
  GrassConfig,
  grassConfigA,
  grassConfigB,
  grassConfigC,
} from "./config";

export enum GrassType {
  A,
  B,
  C,
}

export const getGrass = (
  position: Vec2,
  type: GrassType,
  player: GameObj,
  tag: string
): GameObj => {
  switch (type) {
    case GrassType.A:
      return loadGrass(
        position,
        "sprites/grass_a.png",
        grassConfigA,
        player,
        tag
      );
    case GrassType.B:
      return loadGrass(
        position,
        "sprites/grass_b.png",
        grassConfigB,
        player,
        tag
      );

    case GrassType.C:
      return loadGrass(
        position,
        "sprites/grass_c.png",
        grassConfigC,
        player,
        tag
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

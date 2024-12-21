import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { crystalConfig } from "./config";

export const getCrystal = (position: Vec2) => {
  k.loadSprite(Objects.CRYSTAL, "sprites/crystal.png", crystalConfig);

  const crystal = k.add([
    sprite(Objects.CRYSTAL),
    pos(position),
    z(2),
    area(),
    body(),
    anchor("bot"),
    Objects.CRYSTAL,
  ]);

  crystal.play("idle");

  crystal.onCollide(Objects.COLLIDER, () => {
    const lastPosition = crystal.pos;
    crystal.destroy();
    getCrystalGround(lastPosition);
  });

  return crystal;
};

const getCrystalGround = (position: Vec2) => {
  const crystal = k.add([
    sprite(Objects.CRYSTAL),
    pos(position),
    z(2),
    area(),
    body({ isStatic: true }),
    anchor("bot"),
    platformEffector({}),
    Objects.CRYSTAL,
  ]);

  crystal.play("idle");

  crystal.onCollide(Objects.PLAYER, () => {
    crystal.play("outline");
  });

  crystal.onCollideEnd(Objects.PLAYER, () => {
    crystal.play("idle");
  });
};

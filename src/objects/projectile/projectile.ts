import { GameObj, Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { ProjectileTypes } from "./config";

export const getProjectile = (
  speed: number,
  position: Vec2,
  projectile: ProjectileTypes
) => {
  switch (projectile) {
    case ProjectileTypes.A:
      k.loadSprite(projectile, "sprites/projectile_a.png");
      break;
    case ProjectileTypes.B:
      k.loadSprite(projectile, "sprites/projectile_b.png");
      break;
    default:
      break;
  }

  const proj = k.add([
    k.sprite(projectile),
    pos(position.x, position.y),
    area(),
    body(),
    move(UP, speed),
    z(1),
    projectile,
  ]);

  proj.gravityScale = 0;

  proj.onCollide(Objects.COLLIDER, () => {
    proj.destroy();
  });

  return proj;
};

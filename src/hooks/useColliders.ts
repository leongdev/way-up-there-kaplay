import { CollisionObject } from "../utils/types";

export const useColliders = (collisionObject: CollisionObject) => {
  //Floor
  collisionObject.colliders.forEach((collider) => {
    add([
      rect(collider.width, collider.height),
      area(),
      pos(collider.x, collider.y),
      body({ isStatic: true }),
      color(color[0], color[1], color[2]),
      opacity(collisionObject.opacity),
    ]);
  });
};

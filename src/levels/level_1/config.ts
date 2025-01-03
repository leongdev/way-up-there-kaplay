import { CollisionObject } from "../../utils/types";

export const levelConfig: CollisionObject = {
  opacity: 0,
  color: [255, 255, 255],
  colliders: [
    { x: 224, y: 256, width: 256, height: 16 },
    { x: 192, y: 192, width: 16, height: 16 },
    { x: 352, y: 144, width: 48, height: 16 },
    { x: 240, y: 80, width: 96, height: 16 },
    { x: 16, y: 256, width: 144, height: 16 },
    { x: 0, y: 32, width: 16, height: 224 },
    { x: 160, y: 32, width: 16, height: 224 },
    { x: 464, y: 32, width: 16, height: 240 },
    { x: 176, y: 32, width: 16, height: 176 },
    { x: 208, y: 192, width: 16, height: 64 },
    { x: 336, y: 80, width: 16, height: 64 },
    { x: 240, y: 96, width: 16, height: 48 },
    { x: 400, y: 144, width: 16, height: 64 },
    { x: 272, y: 144, width: 16, height: 64 },
    { x: 16, y: 16, width: 144, height: 16 },
  ],
};

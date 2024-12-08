export enum Objects {
  PLAYER = "player",
  STAIR = "stair",
  GRASS_A = "grass_a",
  GRASS_B = "grass_b",
}

export enum Scenes {
  INITIAL = "initial",
}

interface Collider {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CollisionObject {
  opacity: number;
  color: number[];
  colliders: Array<Collider>;
}

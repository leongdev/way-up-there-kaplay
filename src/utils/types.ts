export enum Objects {
  PLAYER = "player",
  STAIR = "stair",
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

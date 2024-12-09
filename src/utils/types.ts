export enum Objects {
  PLAYER = "player",
  STAIR = "stair",
  GRASS_A = "grass_a",
  GRASS_B = "grass_b",
  GRASS_C = "grass_c",
  GRASS_D = "grass_d",
  GRASS_E = "grass_e",
  GRASS_F = "grass_f",
  GRASS_G = "grass_g",
  GRASS_H = "grass_h",
  GRASS_I = "grass_i",
  GRASS_J = "grass_j",
  GRASS_K = "grass_k",
  GRASS_L = "grass_l",
  GRASS_M = "grass_m",
  GRASS_N = "grass_n",
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

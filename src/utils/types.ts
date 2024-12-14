export enum Objects {
  PLAYER = "player",
  STAIR = "stair",
  SHIP = "ship",
  CONTROLLER = "controller",
  FUEL_MACHINE = "fuel_machine",
  MIX_MACHINE = "mix_machine",
  PRINT_MACHINE = "print_machine",
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
  GRASS_O = "grass_o",
  GRASS_P = "grass_p",
  GRASS_Q = "grass_q",
}

export enum Events {
  ON_MOVE_SHIP_LEFT = "onMoveShipLeft",
  ON_MOVE_SHIP_RIGHT = "onMoveShipRight",
  ON_DISABLE_CONTROL_SHIP = "onDisableControlShip",
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

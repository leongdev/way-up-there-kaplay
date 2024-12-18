export enum Objects {
  PLAYER = "player",
  STAIR = "stair",
  SHIP = "ship",
  PROJECTILE_A = "projectile_a",
  CONTROLLER = "controller",
  MIX_MACHINE = "mix_machine",
  PRINT_MACHINE = "print_machine",
  PRINT_UI_SELECTION = "print_ui_selection",
  FUEL_MACHINE = "fuel_machine",
  FUEL_CELL_INDICATOR = "fuel_cell_indicator",
  FUEL_CELL_A = "fuel_cell_a",
  FUEL_CELL_B = "fuel_cell_b",
  FUEL_CELL_C = "fuel_cell_c",
  FUEL_CELL_D = "fuel_cell_d",
  FUEL_CELL_E = "fuel_cell_e",
  FUEL_LINE = "fuel_line",
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
  COLLIDER = "collider",
}

export enum Events {
  // Ship Events
  ON_MOVE_SHIP_LEFT = "onMoveShipLeft",
  ON_MOVE_SHIP_RIGHT = "onMoveShipRight",
  ON_DISABLE_CONTROL_SHIP = "onDisableControlShip",
  ON_ENABLE_CONTROL_SHIP = "onEnableControlShip",
  ON_FIRE_SHIP = "onFireShip",

  // Fuel Events
  ON_RUN_OUT_OF_ENERGY = "onRunOutOfEnergy",
  ADD_FUEL = "addFuel",

  ON_ENABLE_PRINT_MACHINE = "onEnablePrintMachine",
  ON_DISABLE_PRINT_MACHINE = "onDisablePrintMachine",
  ON_SHOW_PRINT_SELECTION = "onShowPrintSelection",
  ON_HIDE_PRINT_SELECTION = "onHidePrintSelection",
  ON_SELECT_LEFT = "onSelectLeft",
  ON_SELECT_RIGHT = "onSelectRight",
  ON_PRINT_ITEM_SELECTED = "onPrintItemSelected",
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

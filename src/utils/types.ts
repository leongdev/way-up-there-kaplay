export enum Objects {
  PLAYER = "player",
  STAIR = "stair",
  SHIP = "ship",
  PROJECTILE_A = "projectile_a",
  CONTROLLER = "controller",
  MIX_MACHINE = "mix_machine",
  PRINT_CRYSTAL_MACHINE = "print_crystal_machine",
  PRINT_POWER_MACHINE = "print_power_machine",
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
  COLLIDER_GROUND = "collider_ground",
  CRYSTAL = "crystal",
  POWER = "power",
  PROGRESS = "progress",
  MIX_DISPLAY = "mix_display",
}

export enum Events {
  // Ship Events
  ON_MOVE_SHIP_LEFT = "onMoveShipLeft",
  ON_MOVE_SHIP_RIGHT = "onMoveShipRight",
  ON_MOVE_SHIP_LEFT_UP = "onMoveShipLeftUp",
  ON_MOVE_SHIP_RIGHT_UP = "onMoveShipRightUp",
  ON_DISABLE_CONTROL_SHIP = "onDisableControlShip",
  ON_ENABLE_CONTROL_SHIP = "onEnableControlShip",
  ON_FIRE_SHIP = "onFireShip",

  // Fuel Events
  ON_RUN_OUT_OF_ENERGY = "onRunOutOfEnergy",
  ADD_FUEL = "addFuel",

  // Print Events
  ON_CREATE_CRYSTAL = "onCreateCrystal",
  ON_START_PRINT_CRYSTAL = "onStartPrintCrystal",
  ON_FINISH_PRINT_CRYSTAL = "onFinishPrintCrystal",

  ON_CREATE_POWER = "onCreatePower",
  ON_START_PRINT_POWER = "onStartPrintPower",
  ON_FINISH_PRINT_POWER = "onFinishPrintPower",

  ON_SHOW_PRINT_SELECTION = "onShowPrintSelection",
  ON_HIDE_PRINT_SELECTION = "onHidePrintSelection",
  ON_SELECT_LEFT = "onSelectLeft",
  ON_SELECT_RIGHT = "onSelectRight",
  ON_PRINT_ITEM_SELECTED = "onPrintItemSelected",

  // Consumable Events
  ON_DOCK_CRYSTAL = "onDockCrystal",
  ON_HAS_CRYSTAL = "onHasCrystal",
  ON_REMOVE_CRYSTAL = "onRemoveCrystal",

  ON_DOCK_POWER = "onDockPower",
  ON_HAS_POWER = "onHasPower",
  ON_REMOVE_POWER = "onRemovePower",

  // Mix Machine Events
  ON_UPLOAD_CRYSTAL = "onUploadCrystal",
  ON_UPLOAD_POWER = "onUploadPower",

  ON_UPLOAD_ITEM = "onUploadItem",
  ON_FIRE_UPLOAD_CRYSTAL = "onFireUploadCrystal",
  ON_FIRE_UPLOAD_POWER = "onFireUploadPower",

  ON_ENABLE_UPLOAD = "onEnableUpload",
  ON_DISABLE_UPLOAD = "onDisableUpload",
  ON_MIX_START = "onMixStart",
  ON_MIX_FINISH = "onMixFinish",

  ON_CREATE_ORB = "onCreateFuel",
  ON_DOCK_ORB = "onDockFuel",
  ON_HAS_ORB = "onHasFuel",
  ON_REMOVE_ORB = "onRemoveFuel",
  ON_COLLIDE_FUEL = "onCollideFuel",
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

export enum ConsumableTypes {
  CRYSTAL = "crystal",
  POWER = "power",
  ORB = "orb",
}

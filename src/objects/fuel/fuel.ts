import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { fuelIndicatorConfig, fuelLineConfig } from "./config";
import { FUEL_DECREASE_DELAY } from "../../utils/constants";

let FUEL_NUMBER: number = 5;
let CAN_CONSUME_FUEL: boolean = false;

export const getFuel = (position: Vec2) => {
  k.loadSprite(Objects.FUEL_LINE, "sprites/fuel_line.png", fuelLineConfig);
  k.loadSprite(
    Objects.FUEL_CELL_INDICATOR,
    "sprites/fuel_indicator.png",
    fuelIndicatorConfig
  );
  k.loadSprite(Objects.FUEL_CELL_A, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_B, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_C, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_D, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_E, "sprites/fuel_cell_top.png");

  const fuelIndicator = k.add([
    k.sprite(Objects.FUEL_CELL_INDICATOR),
    pos(position),
    area(),
    z(1),
    Objects.FUEL_CELL_INDICATOR,
  ]);

  const fuelLine = k.add([
    k.sprite(Objects.FUEL_LINE),
    pos(191, 197),
    area(),
    z(1),
    Objects.FUEL_LINE,
  ]);

  fuelIndicator.play("idle");

  fuelLine.onAnimEnd((anim: string) => {
    if (anim === "fuel") {
      FUEL_NUMBER++;
      fuelLine.play("idle");
    }
  });

  const cell_A = k.add([
    k.sprite(Objects.FUEL_CELL_A),
    pos(position.x + 4, position.y + 30),
    area(),
    z(1),
    Objects.FUEL_CELL_A,
  ]);

  const cell_B = k.add([
    k.sprite(Objects.FUEL_CELL_B),
    pos(position.x + 4, position.y + 23),
    area(),
    z(1),
    Objects.FUEL_CELL_B,
  ]);

  const cell_C = k.add([
    k.sprite(Objects.FUEL_CELL_C),
    pos(position.x + 4, position.y + 16),
    area(),
    z(1),
    Objects.FUEL_CELL_C,
  ]);

  const cell_D = k.add([
    k.sprite(Objects.FUEL_CELL_D),
    pos(position.x + 4, position.y + 9),
    area(),
    z(1),
    Objects.FUEL_CELL_D,
  ]);

  const cell_E = k.add([
    k.sprite(Objects.FUEL_CELL_E),
    pos(position.x + 4, position.y + 3),
    area(),
    z(1),
    Objects.FUEL_CELL_E,
  ]);

  const fuel_timer = add([timer()]);

  k.on(Events.ON_ENABLE_CONTROL_SHIP, Objects.PLAYER, () => {
    CAN_CONSUME_FUEL = true;
    fuelIndicator.play("fuel");
  });

  k.on(Events.ON_DISABLE_CONTROL_SHIP, Objects.PLAYER, () => {
    fuelIndicator.play("idle");
    CAN_CONSUME_FUEL = false;
  });

  k.on(Events.ADD_FUEL, Objects.FUEL_LINE, () => {
    if (FUEL_NUMBER < 6) {
      fuelLine.play("fuel");
    }
  });

  fuel_timer.loop(FUEL_DECREASE_DELAY, () => {
    if (!CAN_CONSUME_FUEL) return;

    if (FUEL_NUMBER > 0) {
      FUEL_NUMBER--;
    }

    if (FUEL_NUMBER < 0) {
      FUEL_NUMBER = 0;
    }
  });

  k.onUpdate(() => {
    cell_A.hidden = FUEL_NUMBER < 1;
    cell_B.hidden = FUEL_NUMBER < 2;
    cell_C.hidden = FUEL_NUMBER < 3;
    cell_D.hidden = FUEL_NUMBER < 4;
    cell_E.hidden = FUEL_NUMBER < 5;

    if (FUEL_NUMBER <= 0) {
      FUEL_NUMBER = 0;
      fuelIndicator.trigger(Events.ON_RUN_OUT_OF_ENERGY);
    }
  });
};

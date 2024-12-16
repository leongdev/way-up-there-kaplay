import { Vec2 } from "kaplay";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { fuelLineConfig } from "./config";
import { FUEL_DECREASE_DELAY } from "../../utils/constants";

let FUEL_NUMBER: number = 5;

export const getFuel = (position: Vec2) => {
  k.loadSprite(Objects.FUEL_LINE, "sprites/fuel_line.png", fuelLineConfig);
  k.loadSprite(Objects.FUEL_CELL_INDICATOR, "sprites/fuel_indicator.png");
  k.loadSprite(Objects.FUEL_CELL_A, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_B, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_C, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_D, "sprites/fuel_cell.png");
  k.loadSprite(Objects.FUEL_CELL_E, "sprites/fuel_cell_top.png");

  k.onDraw(() => {
    // Draw indicator background
    k.drawSprite({
      sprite: Objects.FUEL_CELL_INDICATOR,
      pos: position,
    });
  });

  const fuelLine = k.add([
    k.sprite(Objects.FUEL_LINE),
    pos(191, 197),
    area(),
    z(1),
    Objects.FUEL_LINE,
  ]);

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

  k.onKeyDown("space", () => {
    if (FUEL_NUMBER < 6) fuelLine.trigger(Events.ADD_FUEL);
  });

  k.on(Events.ADD_FUEL, Objects.FUEL_LINE, () => {
    if (FUEL_NUMBER < 6) {
      fuelLine.play("fuel");
    }
  });

  fuel_timer.loop(FUEL_DECREASE_DELAY, () => {
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
  });
};

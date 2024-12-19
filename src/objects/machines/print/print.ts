import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { printConfig, printSelectionConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";

let CAN_SHOW_SELECTION: boolean = false;
let ITEM_SELECTED: number = 0;

export const getPrinter = (position: Vec2) => {
  k.loadSprite(Objects.PRINT_MACHINE, "sprites/print_machine.png", printConfig);
  k.loadSprite(
    Objects.PRINT_UI_SELECTION,
    "sprites/printer_UI_selection.png",
    printSelectionConfig
  );

  const printMachine = k.add([
    k.sprite(Objects.PRINT_MACHINE),
    pos(position),
    area(),
    z(0),
    Objects.PRINT_MACHINE,
  ]);

  const printUISelection = k.add([
    k.sprite(Objects.PRINT_UI_SELECTION),
    pos(vec2(position.x - 12, position.y - 24)),
    area(),
    z(0),
    Objects.PRINT_UI_SELECTION,
  ]);

  printUISelection.hidden = true;

  printUISelection.play("idle");

  printMachine.play("idle");

  k.on(Events.ON_SHOW_PRINT_SELECTION, Objects.PLAYER, () => {
    if (CAN_SHOW_SELECTION) {
      printUISelection.hidden = false;
    }
  });

  k.on(Events.ON_HIDE_PRINT_SELECTION, Objects.PLAYER, () => {
    printUISelection.hidden = true;
  });

  k.on(Events.ON_ENABLE_PRINT_MACHINE, Objects.PLAYER, () => {
    CAN_SHOW_SELECTION = true;
    printMachine.play("outline");
  });

  k.on(Events.ON_DISABLE_PRINT_MACHINE, Objects.PLAYER, () => {
    CAN_SHOW_SELECTION = false;
    printMachine.play("idle");
  });

  k.on(Events.ON_SELECT_LEFT, Objects.PLAYER, () => {
    printUISelection.play("left");
  });

  k.on(Events.ON_SELECT_RIGHT, Objects.PLAYER, () => {
    printUISelection.play("right");
  });

  k.on(Events.ON_SELECT_RIGHT, Objects.PLAYER, () => {
    printUISelection.play("right");
  });

  k.on(Events.ON_PRINT_ITEM_SELECTED, Objects.PLAYER, () => {
    printMachine.play("idle");
    // DO SOMETHING
  });

  return printMachine;
};

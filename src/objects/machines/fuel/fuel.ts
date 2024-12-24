import { Vec2 } from "kaplay";
import { k } from "../../../settings/kaplay";
import { Events, Objects } from "../../../utils/types";
import { fuelConfig } from "./config";
import { InputConfig, InputMethod, onInput } from "../../../settings/inputs";

let isBuildingFuel: boolean = false;
let canAddFuel: boolean = false;

export const getFuelMachine = (position: Vec2) => {
  k.loadSprite(Objects.FUEL_MACHINE, "sprites/fuel_machine.png", fuelConfig);

  const fuelMachine = k.add([
    k.sprite(Objects.FUEL_MACHINE),
    pos(position),
    area(),
    area({
      shape: new Rect(vec2(0, 20), 20, 40),
    }),
    z(0),
    Objects.FUEL_MACHINE,
  ]);

  fuelMachine.play("idle");

  fuelMachine.onCollide(Objects.PLAYER, () => {
    if (!isBuildingFuel) fuelMachine.play("outline");
  });

  fuelMachine.onCollideEnd(Objects.PLAYER, () => {
    if (!isBuildingFuel) fuelMachine.play("idle");
  });

  k.on(Events.ON_COLLIDE_FUEL, Objects.PLAYER, (_, args) => {
    const { colliding, hasOrb } = args;
    if (colliding && hasOrb) canAddFuel = true;
    else canAddFuel = false;
  });

  k.on(Events.ADD_FUEL, Objects.FUEL_MACHINE, () => {
    isBuildingFuel = true;
    fuelMachine.play("building");
  });

  fuelMachine.onAnimEnd((anim: string) => {
    if (anim === "building") {
      isBuildingFuel = false;
      fuelMachine.play("idle");
    }
  });

  onInput(
    () => {
      if (canAddFuel) {
        canAddFuel = false;
        fuelMachine.trigger(Events.ADD_FUEL);
      }
    },
    () => {},
    InputMethod.PRESS,
    InputConfig.fire
  );

  return fuelMachine;
};

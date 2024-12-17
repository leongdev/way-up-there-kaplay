import { GameObj, Vec2 } from "kaplay";
import {
  InputConfig,
  InputMethod,
  isKeyHorizontalDown,
  isKeyVerticalDown,
  onInput,
  onInputDown,
  onInputHorizontal,
  onInputLeft,
  onInputRight,
  onInputUp,
  onInputVertical,
} from "../../settings/inputs";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { playerConfig } from "./config";

const SPEED = 150;

let canMoveUp = false;
let canControlShip: boolean = false;
let isControlShipEnabled: boolean = false;
let canEnableMovement: boolean = false;
let canPrintItem: boolean = false;
let canMove: boolean = true;

export function getPlayer(position: Vec2): GameObj {
  const player = loadPlayer(position);
  player.play("idle");

  handleAnimation(player);
  handleVerticalMovement(player);
  handleHorizontalMovement(player);
  handleController(player);
  handlePrintMachine(player);

  return player;
}

const handlePrintMachine = (player: GameObj) => {
  onInput(
    () => {
      if (canPrintItem) {
        player.trigger(Events.ON_SHOW_PRINT_SELECTION);
        canMove = false;
        player.play("idle");
      }
    },
    () => {
      if (canPrintItem) {
        player.trigger(Events.ON_HIDE_PRINT_SELECTION);
        canMove = true;
      }
    },
    InputMethod.PRESS,
    InputConfig.fire
  );

  onInput(
    () => {
      if (canPrintItem) player.trigger(Events.ON_SELECT_LEFT);
    },
    () => {
      if (canPrintItem) player.trigger(Events.ON_PRINT_ITEM_SELECTED);
    },
    InputMethod.PRESS,
    InputConfig.left
  );

  onInput(
    () => {
      if (canPrintItem) player.trigger(Events.ON_SELECT_RIGHT);
    },
    () => {
      if (canPrintItem) player.trigger(Events.ON_PRINT_ITEM_SELECTED);
    },
    InputMethod.PRESS,
    InputConfig.right
  );

  player.onCollide(Objects.PRINT_MACHINE, () => {
    canPrintItem = true;
    player.trigger(Events.ON_ENABLE_PRINT_MACHINE);
  });

  player.onCollideEnd(Objects.PRINT_MACHINE, () => {
    canPrintItem = false;
    player.trigger(Events.ON_DISABLE_PRINT_MACHINE);
  });
};

/**
 * This function handles the controller object
 * @param player Player Game Object
 */
const handleController = (player: GameObj) => {
  player.onCollide(Objects.CONTROLLER, () => {
    canControlShip = true;
  });

  player.onCollideEnd(Objects.CONTROLLER, () => {
    canControlShip = false;
  });

  onInput(
    () => {
      if (canControlShip) {
        isControlShipEnabled = true;
        player.trigger(Events.ON_ENABLE_CONTROL_SHIP);
      }
    },
    () => {
      if (canControlShip) {
        isControlShipEnabled = false;
      }
    },
    InputMethod.PRESS,
    InputConfig.fire
  );

  onInput(
    () => {},
    () => {
      player.trigger(Events.ON_DISABLE_CONTROL_SHIP);
    },
    InputMethod.PRESS,
    InputConfig.fire
  );
};

const loadPlayer = (position: Vec2) => {
  k.loadSprite(Objects.PLAYER, "sprites/player.png", playerConfig);

  return k.add([
    k.sprite(Objects.PLAYER),
    pos(position),
    anchor("bot"),
    area({
      shape: new Rect(vec2(0, 0), 8, 16),
    }),
    body(),
    z(1),
    Objects.PLAYER,
  ]);
};

const handleAnimation = (player: GameObj) => {
  // Vertical Movement
  onInputVertical(
    () => {
      if (canMoveUp) player.play("up");
    },
    () => {
      if (!isKeyVerticalDown() && canMoveUp) player.play("up_idle");
    },
    InputMethod.PRESS
  );

  // Horizontal Movement
  onInputHorizontal(
    () => {
      if (!canMove) {
        player.play("idle");
        return;
      }
      if (player.isGrounded() && !canMoveUp && !isControlShipEnabled && canMove)
        player.play("run");
    },
    () => {
      if (!isKeyHorizontalDown() && !canMoveUp) {
        player.play("idle");
      }
    },
    InputMethod.PRESS
  );

  player.onCollideEnd(Objects.STAIR, () => {
    if (isKeyHorizontalDown()) player.play("run");
    else player.play("idle");
  });

  player.onCollide(Objects.STAIR, () => {
    if (isKeyVerticalDown()) player.play("up");
    else player.play("up_idle");
  });

  player.onCollide(Objects.CONTROLLER, () => {
    if (isControlShipEnabled) player.play("idle");
  });
};

const handleVerticalMovement = (player: GameObj) => {
  player.onCollide(Objects.STAIR, () => {
    canMoveUp = true;
    player.gravityScale = 0;
  });

  player.onCollideEnd(Objects.STAIR, () => {
    canMoveUp = false;
    player.gravityScale = 1;
  });

  onInputUp(() => {
    if (canMoveUp) {
      player.move(0, -SPEED);
    }
  });

  onInputDown(() => {
    player.move(0, SPEED);
  });
};

export const handleHorizontalMovement = (player: GameObj) => {
  onInputLeft(
    () => {
      if (!canMove) return;
      if (isControlShipEnabled) {
        player.trigger(Events.ON_MOVE_SHIP_LEFT);
        if (!canEnableMovement) {
          player.play("idle");
          canEnableMovement = true;
        }
      } else {
        player.move(-SPEED, 0);
        player.flipX = true;
      }
    },
    () => {
      canEnableMovement = false;
    }
  );

  onInputRight(
    () => {
      if (!canMove) return;
      if (isControlShipEnabled) {
        player.trigger(Events.ON_MOVE_SHIP_RIGHT);
        if (!canEnableMovement) {
          player.play("idle");
          canEnableMovement = true;
        }
      } else {
        player.move(SPEED, 0);
        player.flipX = false;
      }
    },
    () => {
      canEnableMovement = false;
    }
  );
};

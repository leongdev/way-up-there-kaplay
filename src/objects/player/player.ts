import { GameObj, Vec2 } from "kaplay";
import {
  InputConfig,
  InputMethod,
  isKeyHorizontalDown,
  isKeyVerticalDown,
  onInput,
} from "../../settings/inputs";
import { k } from "../../settings/kaplay";
import { Events, Objects } from "../../utils/types";
import { playerConfig } from "./config";

const SPEED = 150;

// Movement Flags
let canMoveHorizontally: boolean = false;
let canMoveVertically: boolean = false;
let canMove: boolean = true;

// Ship Control Flag
let canControlShip: boolean = false;

export function getPlayer(position: Vec2): GameObj {
  const player = loadPlayer(position);
  player.play("idle");

  handleAnimation(player);
  handleVerticalMovement(player);
  handleHorizontalMovement(player);
  handleController();
  handlePrintCrystal();
  handlePrintPower();

  return player;
}

const handlePrintPower = () => {
  k.on(
    Events.ON_ENABLE_POWER_PRINT_MACHINE,
    Objects.PRINT_POWER_MACHINE,
    () => {
      canMove = false;
    }
  );

  k.on(
    Events.ON_DISABLE_POWER_PRINT_MACHINE,
    Objects.PRINT_POWER_MACHINE,
    () => {
      canMove = true;
    }
  );
};

const handlePrintCrystal = () => {
  k.on(
    Events.ON_ENABLE_CRYSTAL_PRINT_MACHINE,
    Objects.PRINT_CRYSTAL_MACHINE,
    () => {
      canMove = false;
    }
  );

  k.on(
    Events.ON_DISABLE_CRYSTAL_PRINT_MACHINE,
    Objects.PRINT_CRYSTAL_MACHINE,
    () => {
      canMove = true;
    }
  );
};

/**
 * This function handles the controller object
 * @param player Player Game Object
 */
const handleController = () => {
  k.on(Events.ON_ENABLE_CONTROL_SHIP, Objects.CONTROLLER, () => {
    canControlShip = true;
  });

  k.on(Events.ON_DISABLE_CONTROL_SHIP, Objects.CONTROLLER, () => {
    canControlShip = false;
  });
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
  onInput(
    () => {
      if (canMoveVertically) player.play("up");
    },
    () => {
      if (!isKeyVerticalDown() && canMoveVertically) player.play("up_idle");
    },
    InputMethod.PRESS,
    [...InputConfig.up, ...InputConfig.down]
  );

  // Horizontal Movement
  onInput(
    () => {
      if (
        player.isGrounded() &&
        !canMoveVertically &&
        !canControlShip &&
        canMove
      )
        player.play("run");
    },
    () => {
      if (!isKeyHorizontalDown() && !canMoveVertically) {
        player.play("idle");
      }
    },
    InputMethod.PRESS,
    [...InputConfig.left, ...InputConfig.right]
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
    if (canControlShip) player.play("idle");
  });
};

const handleVerticalMovement = (player: GameObj) => {
  player.onCollide(Objects.STAIR, () => {
    canMoveVertically = true;
    player.gravityScale = 0;
  });

  player.onCollideEnd(Objects.STAIR, () => {
    canMoveVertically = false;
    player.gravityScale = 1;
  });

  // UP
  onInput(
    () => {
      if (canMoveVertically) {
        player.move(0, -SPEED);
      }
    },
    () => {},
    InputMethod.DOWN,
    InputConfig.up
  );

  // DOWN
  onInput(
    () => {
      player.move(0, SPEED);
    },
    () => {},
    InputMethod.DOWN,
    InputConfig.down
  );
};

export const handleHorizontalMovement = (player: GameObj) => {
  // LEFT
  onInput(
    () => {
      if (canControlShip) {
        player.trigger(Events.ON_MOVE_SHIP_LEFT);
        if (!canMoveHorizontally) {
          player.play("idle");
          canMoveHorizontally = true;
        }
      } else {
        if (canMove) {
          player.move(-SPEED, 0);
          player.flipX = true;
        }
      }
    },
    () => {
      canMoveHorizontally = false;
    },
    InputMethod.DOWN,
    InputConfig.left
  );

  // RIGHT
  onInput(
    () => {
      if (canControlShip) {
        player.trigger(Events.ON_MOVE_SHIP_RIGHT);
        if (!canMoveHorizontally) {
          player.play("idle");
          canMoveHorizontally = true;
        }
      } else {
        if (canMove) {
          player.move(SPEED, 0);
          player.flipX = false;
        }
      }
    },
    () => {
      canMoveHorizontally = false;
    },
    InputMethod.DOWN,
    InputConfig.right
  );
};

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

let canMoveUp = false;
let isControlShipEnabled: boolean = false;
let canEnableMovement: boolean = false;

export function getPlayer(position: Vec2): GameObj {
  const player = loadPlayer(position);
  player.play("idle");

  handleAnimation(player);
  handleVerticalMovement(player);
  handleHorizontalMovement(player);
  handleController();

  return player;
}

/**
 * This function handles the controller object
 * @param player Player Game Object
 */
const handleController = () => {
  k.on(Events.ON_ENABLE_CONTROL_SHIP, Objects.CONTROLLER, () => {
    isControlShipEnabled = true;
  });

  k.on(Events.ON_DISABLE_CONTROL_SHIP, Objects.CONTROLLER, () => {
    isControlShipEnabled = false;
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
      if (canMoveUp) player.play("up");
    },
    () => {
      if (!isKeyVerticalDown() && canMoveUp) player.play("up_idle");
    },
    InputMethod.PRESS,
    [...InputConfig.up, ...InputConfig.down]
  );

  // Horizontal Movement
  onInput(
    () => {
      if (player.isGrounded() && !canMoveUp && !isControlShipEnabled)
        player.play("run");
    },
    () => {
      if (!isKeyHorizontalDown() && !canMoveUp) {
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

  // UP
  onInput(
    () => {
      if (canMoveUp) {
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
    },
    InputMethod.DOWN,
    InputConfig.left
  );

  // RIGHT
  onInput(
    () => {
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
    },
    InputMethod.DOWN,
    InputConfig.right
  );
};

import { GameObj, Vec2 } from "kaplay";
import {
  InputConfig,
  InputMethod,
  isKeyHorizontalDown,
  isKeyVerticalDown,
  onInputDown,
  onInputHorizontal,
  onInputLeft,
  onInputRight,
  onInputUp,
  onInputVertical,
} from "../../settings/inputs";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { playerConfig } from "./config";

const SPEED = 150;
let canMoveUp = false;

export function getPlayer(position: Vec2): GameObj {
  const player = loadPlayer(position);

  player.play("idle");
  handleAnimation(player);
  handleVerticalMovement(player);
  handleHorizontalMovement(player);

  return player;
}

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
      if (player.isGrounded() && !canMoveUp) player.play("run");
    },
    () => {
      if (!isKeyHorizontalDown() && !canMoveUp) {
        player.play("idle");
      }
    },
    InputMethod.PRESS
  );

  // Other
  player.onCollideEnd(Objects.STAIR, () => {
    if (isKeyHorizontalDown()) player.play("run");
    else player.play("idle");
  });

  player.onCollide(Objects.STAIR, () => {
    if (isKeyVerticalDown()) player.play("up");
    else player.play("up_idle");
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
  onInputLeft(() => {
    player.move(-SPEED, 0);
    player.flipX = true;
  });

  onInputRight(() => {
    player.move(SPEED, 0);
    player.flipX = false;
  });
};

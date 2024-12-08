import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { playerConfig } from "./config";
import { GameObj, Vec2 } from "kaplay";

const SPEED = 150;

let onStair = false;

export function getPlayer(position: Vec2): GameObj {
  const player = loadPlayer(position);

  player.play("idle");

  handleHorizontalMovement(player);
  handleVerticalMovement(player);
  handleAnimation(player);

  player.onCollide(Objects.STAIR, () => {
    onStair = true;
    player.gravityScale = 0;
  });

  player.onCollideEnd(Objects.STAIR, () => {
    onStair = false;
    player.gravityScale = 1;
  });
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
  ["up", "down"].forEach((key) => {
    k.onKeyPress(key, () => {
      if (onStair) player.play("up");
    });
  });

  player.onCollideEnd(Objects.STAIR, () => {
    player.play("run");
  });

  // Horizontal Movement
  ["left", "right"].forEach((key) => {
    k.onKeyPress(key, () => {
      player.play("run");
    });

    k.onKeyRelease(key, () => {
      // Only reset to "idle" if player is not holding any of these keys
      if (
        player.isGrounded() &&
        !k.isKeyDown("left") &&
        !k.isKeyDown("right") &&
        !onStair
      ) {
        player.play("idle");
      }
    });
  });
};

const handleVerticalMovement = (player: GameObj) => {
  k.onKeyDown("up", () => {
    if (onStair) {
      moveUp(player);
    }
  });

  k.onKeyDown("down", () => {
    if (onStair) {
      moveDown(player);
    }
  });
};

export const handleHorizontalMovement = (player: GameObj) => {
  k.onKeyDown("left", () => {
    moveLeft(player);
  });

  k.onKeyDown("right", () => {
    moveRight(player);
  });
};

const moveLeft = (player: GameObj) => {
  player.move(-SPEED, 0);
  player.flipX = true;
};

const moveRight = (player: GameObj) => {
  player.move(SPEED, 0);
  player.flipX = false;
};

const moveUp = (player: GameObj) => {
  player.move(0, -SPEED);
};

const moveDown = (player: GameObj) => {
  player.move(0, SPEED);
};

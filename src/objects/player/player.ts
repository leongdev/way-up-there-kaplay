import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { playerConfig } from "./config";
import { GameObj } from "kaplay";

const JUMP_FORCE = 600;
const SCALE_JUMP = 0.6;
const SCALE_FALL = 1.3;
const SCALE_DEFAULT = 1;
const SPEED = 150;

let direction = 1;
let canMove = false;

let fallLocker = false;
let jumpLocker = false;
let groundLocker = false;

export function loadPlayer(posX: number, posY: number): GameObj {
  k.loadSprite(Objects.PLAYER, "sprites/player.png", playerConfig);
  const player = k.add([
    k.sprite(Objects.PLAYER),
    pos(Vec2.fromArray([posX, posY])),
    anchor("center"),
    area(),
    body(),
  ]);

  onKeyPress("space", () => {
    playerJump(player);
  });

  player.play("idle");

  player.onUpdate(() => {
    movementY(player);
    movementX(player);
    animations(player);
  });

  return player;
}

export const updateDirection = (value: number) => {
  direction = value;
};

const animations = (player: GameObj) => {
  if (player.isJumping() && !jumpLocker) {
    player.play("jump");

    jumpLocker = true;
    fallLocker = false;
    groundLocker = false;
  } else if (player.isFalling() && !fallLocker) {
    player.play("fall");

    fallLocker = true;
    jumpLocker = false;
    groundLocker = false;
  } else if (player.isGrounded() && !groundLocker) {
    if (canMove) {
      player.play("run");
    } else {
      player.play("idle");
    }

    groundLocker = true;
    fallLocker = false;
    jumpLocker = false;
  }
};

const movementX = (player: GameObj) => {
  if (!canMove) return;

  if (direction === 1) {
    player.move(SPEED, 0);
    player.flipX = false;
  } else if (direction === -1) {
    player.move(-SPEED, 0);
    player.flipX = true;
  }
};

const movementY = (player: GameObj) => {
  if (player.isJumping()) {
    player.gravityScale = SCALE_JUMP;
  } else if (player.isFalling()) {
    player.gravityScale = SCALE_FALL;
  } else {
    player.gravityScale = SCALE_DEFAULT;
  }
};

const playerJump = (player: GameObj) => {
  if (player.isGrounded()) {
    player.jump(JUMP_FORCE);
    canMove = true;
  }
};

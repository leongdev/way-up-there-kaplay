import { loadPlayer, updateDirection } from "../objects/player/player";
import { k } from "../settings/kaplay";
import { postEffect } from "../settings/postEffect";
import { Scenes } from "../utils/types";

const FLOOR_HEIGHT = 48;
const GRAVITY_DEFAULT = 2500;

let canDebug = false;

k.scene(Scenes.INITIAL, () => {
  //Setup Physics
  setGravity(GRAVITY_DEFAULT);

  //Load Objects
  const player = loadPlayer(80, 80);

  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(1),
    pos(0, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(255, 255, 255),
  ]);

  // floor
  const leftWall = add([
    rect(10, height()),
    outline(1),
    pos(0, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(255, 255, 255),
  ]);

  // Right wall
  const rightWall = add([
    rect(10, height()),
    outline(1),
    pos(width() - 10, height()),
    anchor("botleft"),
    area(),
    body({ isStatic: true }),
    color(255, 255, 255),
  ]);

  onUpdate(() => {
    postEffect();
    debug.inspect = canDebug;
  });

  player.onUpdate(() => {
    if (player.isColliding(leftWall)) {
      updateDirection(1);
    }

    if (player.isColliding(rightWall)) {
      updateDirection(-1);
    }
  });

  onKeyPress("r", () => {
    canDebug = !canDebug;
  });
});

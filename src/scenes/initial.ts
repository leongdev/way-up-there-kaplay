import { useBackground } from "../hooks/useBackground";
import { useColliders } from "../hooks/useColliders";
import { useCustomPostEffect } from "../hooks/useCustomPostEffect";
import { useDebugger } from "../hooks/useDebugger";
import { useFullScreen } from "../hooks/useFullScreen";
import { levelConfig } from "../levels/level_1/config";
import { getGrass, GrassType } from "../objects/grass/grass";
import { getPlayer } from "../objects/player/player";
import { getStair } from "../objects/stair/stair";
import { k } from "../settings/kaplay";
import { Scenes } from "../utils/types";

const GRAVITY_DEFAULT = 1000;

k.scene(Scenes.INITIAL, () => {
  //Hooks
  useFullScreen("f");
  useDebugger("r");
  useCustomPostEffect("g");
  useBackground("world", vec2(0, 0), "sprites/world.png");

  //Setup Physics
  setGravity(GRAVITY_DEFAULT);

  //Colliders
  useColliders(levelConfig);

  //Objects
  getStair(new Vec2(417, 136), "sprites/stair_a.png");
  getStair(new Vec2(225, 184), "sprites/stair_b.png");
  getStair(new Vec2(353, 72), "sprites/stair_c.png");

  const player = getPlayer(new Vec2(205, 173));

  getGrass(new Vec2(240, 248), GrassType.A, player);
  getGrass(new Vec2(258, 249), GrassType.B, player);
});

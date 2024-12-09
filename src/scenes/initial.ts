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
import { Objects, Scenes } from "../utils/types";

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

  getGrass(new Vec2(240, 249), GrassType.A, player, Objects.GRASS_A);
  getGrass(new Vec2(258, 249), GrassType.B, player, Objects.GRASS_B);
  getGrass(new Vec2(354, 249), GrassType.A, player, Objects.GRASS_C);
  getGrass(new Vec2(363, 249), GrassType.B, player, Objects.GRASS_D);
  getGrass(new Vec2(374, 249), GrassType.A, player, Objects.GRASS_E);
  getGrass(new Vec2(409, 249), GrassType.A, player, Objects.GRASS_F);
  getGrass(new Vec2(415, 249), GrassType.B, player, Objects.GRASS_G);
  getGrass(new Vec2(423, 249), GrassType.B, player, Objects.GRASS_H);
  getGrass(new Vec2(192, 184), GrassType.A, player, Objects.GRASS_I);
  getGrass(new Vec2(200, 184), GrassType.B, player, Objects.GRASS_J);
  getGrass(new Vec2(210, 184), GrassType.B, player, Objects.GRASS_K);
  getGrass(new Vec2(307, 64), GrassType.C, player, Objects.GRASS_L);
  getGrass(new Vec2(302, 240), GrassType.C, player, Objects.GRASS_M);
});

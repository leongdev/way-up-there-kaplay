import { useBackground } from "../hooks/useBackground";
import { useColliders } from "../hooks/useColliders";
import { useCustomPostEffect } from "../hooks/useCustomPostEffect";
import { useDebugger } from "../hooks/useDebugger";
import { useFullScreen } from "../hooks/useFullScreen";
import { levelConfig } from "../levels/level_1/config";
import { getBrain } from "../objects/brain/brain";
import { getController } from "../objects/controller/controller";
import { getFuel } from "../objects/fuel/fuel";
import { getGrass, GrassType } from "../objects/grass/grass";
import { getCrystalPrinter } from "../objects/machines/crystal/crystal";
import { getFuelMachine } from "../objects/machines/fuel/fuel";
import { getMixMachine } from "../objects/machines/mix/mix";
import { getPowerPrinter } from "../objects/machines/power/power";
import { getPlayer } from "../objects/player/player";
import { getShip } from "../objects/ship/ship";
import { getStair } from "../objects/stair/stair";
import { getStarts } from "../objects/starts/stars";
import { k } from "../settings/kaplay";
import { Objects, Scenes } from "../utils/types";

const GRAVITY_DEFAULT = 1000;
k.scene(Scenes.INITIAL, () => {
  //Hooks
  useFullScreen("f");
  useDebugger("r");
  useCustomPostEffect("g", true);
  useBackground("world", vec2(0, 0), "sprites/world.png");

  //Setup Physics
  setGravity(GRAVITY_DEFAULT);

  //Colliders
  useColliders(levelConfig);

  //Objects
  const player = getPlayer(new Vec2(205, 173));

  getStair(new Vec2(417, 136), "sprites/stair_a.png");
  getStair(new Vec2(225, 184), "sprites/stair_b.png");
  getStair(new Vec2(353, 72), "sprites/stair_c.png");

  getShip(new Vec2(72, 240));

  getController(new Vec2(326, 232));

  getGrass(new Vec2(240, 248), GrassType.A, player, Objects.GRASS_A);
  getGrass(new Vec2(258, 248), GrassType.B, player, Objects.GRASS_B);
  getGrass(new Vec2(354, 248), GrassType.A, player, Objects.GRASS_C);
  getGrass(new Vec2(363, 248), GrassType.B, player, Objects.GRASS_D);
  getGrass(new Vec2(374, 248), GrassType.A, player, Objects.GRASS_E);
  getGrass(new Vec2(409, 248), GrassType.A, player, Objects.GRASS_F);
  getGrass(new Vec2(415, 248), GrassType.B, player, Objects.GRASS_G);
  getGrass(new Vec2(423, 248), GrassType.B, player, Objects.GRASS_H);
  getGrass(new Vec2(192, 184), GrassType.A, player, Objects.GRASS_I);
  getGrass(new Vec2(200, 184), GrassType.B, player, Objects.GRASS_J);
  getGrass(new Vec2(210, 184), GrassType.B, player, Objects.GRASS_K);
  getGrass(new Vec2(307, 64), GrassType.C, player, Objects.GRASS_L);
  getGrass(new Vec2(302, 240), GrassType.C, player, Objects.GRASS_M);
  getGrass(new Vec2(325, 72), GrassType.A, player, Objects.GRASS_N);
  getGrass(new Vec2(333, 72), GrassType.B, player, Objects.GRASS_O);
  getGrass(new Vec2(343, 72), GrassType.A, player, Objects.GRASS_P);
  getGrass(new Vec2(406, 136), GrassType.B, player, Objects.GRASS_Q);

  getFuelMachine(new Vec2(192, 127));
  getMixMachine(new Vec2(250, 47));
  getCrystalPrinter(new Vec2(375, 109));
  getPowerPrinter(new Vec2(433, 219));
  getFuel(new Vec2(177, 210));
  getStarts(new Vec2(90, 36));
  getBrain(new Vec2(90, 36));
});

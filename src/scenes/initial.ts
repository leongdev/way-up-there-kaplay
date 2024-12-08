import { useBackground } from "../hooks/useBackground";
import { useDebugger } from "../hooks/useDebugger";
import { useFullScreen } from "../hooks/useFullScreen";
import { k } from "../settings/kaplay";
import { useCustomPostEffect } from "../hooks/useCustomPostEffect";
import { Scenes } from "../utils/types";
import { useColliders } from "../hooks/useColliders";
import { levelConfig } from "../levels/level_1/config";

const FLOOR_HEIGHT = 48;
const GRAVITY_DEFAULT = 2500;

k.scene(Scenes.INITIAL, () => {
  //Hooks
  useFullScreen("f");
  useDebugger("r");
  useCustomPostEffect("g");
  useBackground("world", vec2(0, 0), "../../public/sprites/world.png");

  //Setup Physics
  setGravity(GRAVITY_DEFAULT);

  //Colliders
  useColliders(levelConfig);
});

import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { starsConfig } from "./config";

const PARTICLE_RANGE = 60;

export const getStarts = (position) => {
  k.loadSprite(Objects.STARS, "sprites/stars.png", starsConfig);

  // Spawn one particle every 0.1 second
  loop(0.1, () => {
    // TODO: they are resolving collision with each other for some reason
    // Compose particle properties with components
    const item = add([
      pos(
        new Vec2(
          rand(position.x - PARTICLE_RANGE, position.x + PARTICLE_RANGE),
          position.y
        )
      ),
      sprite(Objects.STARS),
      anchor("center"),
      body({ gravityScale: 0.04 }),
      lifespan(1.5),
      opacity(1),
      Objects.STARS,
    ]);

    item.frame = getNewFrame(6);
  });
};

const getNewFrame = (size: number) => {
  return Number(rand(0, size).toFixed(0));
};

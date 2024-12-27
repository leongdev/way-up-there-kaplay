import { GameObj, Vec2 as Vector2D } from "kaplay";
import { k } from "../../settings/kaplay";
import { Objects } from "../../utils/types";
import { alertConfig, enemyOneConfig } from "./config";

const ENEMY_SPAWN_DELAY: number = 3;
const ENEMY_X_RANGE: number = 60;

let HP: number = 100;

let canSpawn: boolean = false;

let WAVE_COUNTER: number = 0;

export const getBrain = (position: Vector2D) => {
  k.loadSprite(Objects.ALERT, "sprites/alert.png", alertConfig);

  k.loop(ENEMY_SPAWN_DELAY, () => {
    if (canSpawn) {
      getEnemy1(
        new Vec2(
          rand(position.x - ENEMY_X_RANGE, position.x + ENEMY_X_RANGE),
          position.y
        )
      );

      WAVE_COUNTER++;

      if (WAVE_COUNTER === 5) {
        WAVE_COUNTER = 0;
        canSpawn = false;

        wait(10, () => {
          canSpawn = true;
        });
      }
    } else {
      const alert = k.add([
        sprite(Objects.ALERT),
        pos(position),
        anchor("center"),
        body({ gravityScale: 0.01 }),
        z(1),
        opacity(1),
        Objects.ALERT,
      ]);

      alert.play("idle");

      alert.onAnimEnd((anim: string) => {
        if (anim === "idle") {
          alert.destroy();
          canSpawn = true;
        }
      });
    }
  });
};

const getEnemy1 = (position: Vector2D) => {
  k.loadSprite(Objects.ENEMY_A, "sprites/enemy_1.png", enemyOneConfig);

  const enemy = k.add([
    sprite(Objects.ENEMY_A),
    pos(position),
    anchor("center"),
    body({ gravityScale: 0.01 }),
    z(1),
    opacity(1),
    area(),
    Objects.ENEMY_A,
  ]);

  enemy.onCollide(Objects.PROJECTILE_A, (projectile: GameObj) => {
    projectile.destroy();
    enemy.play("hit");
    HP -= 50;

    if (HP <= 0) {
      enemy.destroy();
    }
  });

  enemy.onCollide(Objects.COLLIDER_GROUND, () => {
    enemy.destroy();
  });

  enemy.onCollide(Objects.SHIP, () => {
    enemy.destroy();
  });

  enemy.onAnimEnd((anim: string) => {
    if (anim === "hit") {
      enemy.play("idle");
    }
  });

  return enemy;
};

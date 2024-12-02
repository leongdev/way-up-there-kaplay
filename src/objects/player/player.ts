import {k} from "../../settings/kaplay";
import {Objects} from "../../utils/types";
import {config} from "./config";
import {GameObj} from "kaplay";

k.loadSprite(
    Objects.PLAYER,
    "sprites/player.png",
    config
)

const JUMP_FORCE = 800;

export function loadPlayer(posX: number, posY: number) {
    const player =  k.add([
        k.sprite(Objects.PLAYER),
        pos(Vec2.fromArray([posX, posY])),
        anchor("center"),
        area(),
        body()
    ]);

    onKeyPress("space", ()=>{
        playerJump(player)
    });

    player.play("idle");

    return player;
}

const playerJump = (player: GameObj) => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE);
    }
}
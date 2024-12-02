import {k} from "../../settings/kaplay";
import {Objects} from "../../utils/types";
import {config} from "./config";

k.loadSprite(
    Objects.PLAYER,
    "sprites/player.png",
    config
)
export function loadPlayer(posX: number, posY: number) {
    const player =  k.add([
        k.sprite(Objects.PLAYER),
        pos(Vec2.fromArray([posX, posY])),
        anchor("center"),
        area(),
        body()
    ]);
    player.play("idle");

    return player;
}
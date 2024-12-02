import {Scenes} from "../utils/types";
import {k} from "../settings/kaplay";
import {loadPlayer} from "../objects/player/player";

k.scene(Scenes.INITIAL, ()=> {

    const player = loadPlayer(300,300);
    k.onClick(() => k.addKaboom(k.mousePos()));
})



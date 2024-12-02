import {Scenes} from "../utils/types";
import {k} from "../settings/kaplay";
import {loadPlayer} from "../objects/player/player";

const GRAVITY       = 2400;
const FLOOR_HEIGHT  = 48;

k.scene(Scenes.INITIAL, ()=> {

    //Setup Physics
    setGravity(GRAVITY);

    //Load Objects
    loadPlayer(300,300);

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

})



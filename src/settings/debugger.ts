import {k} from "./kaplay";

let canDebug = false;

const useDebugger = () => {
    k.onKeyPress("r", () => {
        canDebug = !canDebug;
        debug.inspect = canDebug;
    });
}
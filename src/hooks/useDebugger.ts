import { k } from "../settings/kaplay";

let canDebug = false;

export const useDebugger = (key: string) => {
  k.onUpdate(() => {
    debug.inspect = canDebug;
  });

  onKeyPress(key, () => {
    canDebug = !canDebug;
  });
};

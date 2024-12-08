import { k } from "../settings/kaplay";

export const useFullScreen = (key: string) => {
  k.onKeyPress(key, (c) => {
    setFullscreen(!isFullscreen());
  });
};

import { k } from "../settings/kaplay";

// Setup post effect
const effects = {
  crt: () => ({
    u_flatness: 3,
  }),
};

// Load all shaders
for (const effect in effects) {
  loadShaderURL(effect, null, `/shaders/${effect}.frag`);
}

let canShowPostEffect = false;

export const useCustomPostEffect = (key: string) => {
  k.onKeyPress(key, () => {
    canShowPostEffect = !canShowPostEffect;
  });

  k.onUpdate(() => {
    if (!canShowPostEffect) return;

    const effect = Object.keys(effects)[0];

    usePostEffect(effect, effects[effect]());
  });
};

import { k } from "../settings/kaplay";

// Setup post effect
const effects = {
  crt: () => ({
    u_flatness: 6,
  }),
};

// Load all shaders
for (const effect in effects) {
  loadShaderURL(effect, null, `/shaders/${effect}.frag`);
}

export const useCustomPostEffect = (key: string, enableOnStart?: boolean) => {
  k.onLoad(() => {
    if (enableOnStart) {
      enableEffect();
    }
  });

  k.onKeyPress(key, () => {
    enableEffect();
  });
};

const enableEffect = () => {
  const effect = Object.keys(effects)[0];
  usePostEffect(effect, effects[effect]());
};

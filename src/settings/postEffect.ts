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

export const useCustomPostEffect = () => {
  onKeyPress("t", () => {
    canShowPostEffect = !canShowPostEffect;
  });

  if (!canShowPostEffect) return;

  const effect = Object.keys(effects)[0];

  usePostEffect(effect, effects[effect]());
};

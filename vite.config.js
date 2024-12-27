import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const kaplayCongrats = () => {
  return {
    name: "Way Up There",
    buildEnd() {
      const line = "-----";
      const msg = `Congratulations! You are way up there! 🚀`;

      process.stdout.write(`\n${line}\n${msg}\n${line}\n`);
    },
  };
};

export default defineConfig({
  // index.html out file will start with a relative path for script
  base: "/way-up-there/",
  build: {
    // disable this for low bundle sizes
    sourcemap: true,
  },
  port: 3001,
  plugins: [
    // Disable messages removing this line
    react(),
    kaplayCongrats(),
  ],
});

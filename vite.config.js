import { defineConfig } from "vite";

const kaplayCongrats = () => {
    return {
        name: 't-rex-light',
        buildEnd() {
            const line = "-----";
            const msg = `🦖`;

            process.stdout.write(`\n${line}\n${msg}\n${line}\n`);
        }
    }
}   


export default defineConfig({
    // index.html out file will start with a relative path for script
    base: "./",
    build: {
        // disable this for low bundle sizes
        sourcemap: true,
    },
    port: 3001,
    plugins: [
        // Disable messages removing this line
        kaplayCongrats(),
    ],

});
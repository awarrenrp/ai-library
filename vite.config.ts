import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Pebble (and some transitive deps) read `process.env` at module-eval time
 * (`JEST_WORKER_ID`, `NODE_ENV`, etc.). Browsers don't define `process`.
 * Replacing these at build time for app + prebundled deps avoids white-screen
 * crashes without touching each callsite. `src/processPolyfill.ts` remains a
 * runtime fallback for any stray `process` reference.
 */
function pebbleBrowserEnvDefine(mode: string) {
  const nodeEnv = mode === "production" ? "production" : "development";
  return {
    "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    "process.env.JEST_WORKER_ID": "undefined",
    "process.env.CI": "undefined",
    "process.env.IS_RR_BUILD_REQUEST": "undefined",
  } as Record<string, string>;
}

export default defineConfig(({ mode }) => {
  const envDefine = pebbleBrowserEnvDefine(mode);
  return {
    plugins: [react()],
    define: envDefine,
    optimizeDeps: {
      esbuildOptions: {
        define: envDefine,
      },
    },
    server: {
      // Bind 0.0.0.0 so Simple Browser, port forwarding, and LAN URLs work; terminal prints a "Network" URL.
      host: true,
      port: 5173,
      strictPort: false,
    },
  };
});

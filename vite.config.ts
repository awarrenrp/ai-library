import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Pebble's pre-bundled chunks reference `process.env.JEST_WORKER_ID` (and a couple of others)
  // at module-eval time. The browser has no `process` global, so without this stub the entire
  // dep chunk throws on import and React never mounts. Replacing every `process.env.*` lookup
  // with `{}.*` (= undefined) is safe — every referenced var is falsy in production anyway.
  define: {
    "process.env": "{}",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        "process.env": "{}",
      },
    },
  },
  server: {
    // Bind 0.0.0.0 so Simple Browser, port forwarding, and LAN URLs work; terminal prints a "Network" URL.
    host: true,
    port: 5173,
    strictPort: false,
  },
});

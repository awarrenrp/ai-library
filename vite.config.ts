import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind 0.0.0.0 so Simple Browser, port forwarding, and LAN URLs work; terminal prints a "Network" URL.
    host: true,
    port: 5173,
    strictPort: false,
  },
});

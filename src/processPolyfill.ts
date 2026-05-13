/**
 * Pebble evaluates `process` / `process.env.*` at module-load time in a few places.
 * Browsers don't define `process` — without this, chunks can throw before React mounts.
 *
 * Vite also replaces known `process.env.*` keys at build time (`vite.config.ts`); this
 * file is a runtime safety net for any code path that still reads `process` as a value.
 */
const g = globalThis as typeof globalThis & { process?: { env: Record<string, string | undefined> } };

if (typeof g.process === "undefined") {
  const isProd = import.meta.env.PROD;
  g.process = {
    env: {
      NODE_ENV: isProd ? "production" : "development",
    },
  };
} else if (!g.process.env) {
  g.process.env = {};
} else if (g.process.env.NODE_ENV === undefined) {
  g.process.env.NODE_ENV = import.meta.env.PROD ? "production" : "development";
}

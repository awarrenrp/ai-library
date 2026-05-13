/**
 * Pebble evaluates `process.env.JEST_WORKER_ID` (and similar) at module-load time.
 * Browsers have no `process` global — without this, dependency chunks throw before
 * React mounts (`ReferenceError: process is not defined`).
 *
 * A minimal `process.env` object is enough: every Pebble branch treats missing keys as falsy.
 */
const g = globalThis as typeof globalThis & { process?: { env: Record<string, string | undefined> } };

if (typeof g.process === "undefined") {
  g.process = { env: {} };
}

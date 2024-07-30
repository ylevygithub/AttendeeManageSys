/**
 * Purpose: This configuration sets up a Vite development environment that integrates with Remix and TypeScript.
 * Features: It leverages the Remix Vite plugin to enable certain future-facing features in Remix v3 and the vite-tsconfig-paths plugin to handle TypeScript path aliases.
 * Future Options: The future options in the Remix plugin enable some new or upcoming features that may include breaking changes, allowing developers to test and prepare for future updates.
 * This configuration helps in setting up a modern, efficient, and maintainable development environment using Vite, Remix, and TypeScript.
 */
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },

  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    exclude: ["e2e/**","node_modules/**",".next/**","dist/**"],
    setupFiles: ["./vitest.setup.js"],
    css: true,
  },
});

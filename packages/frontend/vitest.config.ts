import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import type { CoverageOptions } from "vitest/node";
import * as path from "node:path";
import { isInDebugMode } from "./src/__test__/isInDebugMode";

const coverageConfig: CoverageOptions = {
  reporter: ["text", "json-summary", "json"],
  reportOnFailure: true,
  provider: "v8",
};

export default defineConfig({
  plugins: [...react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared/src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    coverage: coverageConfig,
    testTimeout: isInDebugMode() ? 3600_000 : 5000,
  },
});

import { config } from "dotenv";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      ...config({ path: ".env.test" }).parsed,
    },
  },
});

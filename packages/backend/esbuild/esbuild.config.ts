import { build, type BuildOptions, context } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: BuildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  outfile: "dist/index.mjs",
  alias: {
    // Resolve relative to the current file's directory
    "@shared": path.resolve(__dirname, "../../shared/src"),
  },
  // Add other esbuild options here if needed
};

const isWatch = process.argv.includes("--watch");

if (isWatch) {
  context(config)
    .then(async (ctx) => {
      await ctx.watch();
      console.log("esbuild is watching for changes...");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} else {
  build(config)
    .then(() => {
      console.log("build complete");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

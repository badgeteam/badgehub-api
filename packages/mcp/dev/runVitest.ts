import { dirname, resolve } from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

interface VitestOptions {
  watch?: boolean;
  ui?: boolean;
  update?: boolean;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const frontendProjectRoot = resolve(__dirname, "../../frontend");
const backendProjectRoot = resolve(__dirname, "../../backend");

export async function runVitestFrontend(
  testPattern: string = "",
  options: VitestOptions = {}
): Promise<any> {
  return runVitest(testPattern, options, frontendProjectRoot);
}

export async function runVitestBackend(
  testPattern: string = "",
  options: VitestOptions = {}
): Promise<any> {
  return runVitest(testPattern, options, backendProjectRoot);
}

export async function runVitest(
  testPattern: string = "",
  options: VitestOptions = {},
  projectRoot: string
): Promise<any> {
  const { update = false } = options;

  return new Promise((resolve, reject) => {
    const args = ["vitest", "run"];

    if (testPattern) {
      args.push(testPattern);
    }

    if (update) {
      args.push("-u");
    }

    args.push("--reporter=json");

    const vitestProcess = spawn("npx", args, {
      cwd: projectRoot,
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    vitestProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    vitestProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    vitestProcess.on("error", (error) => {
      reject(new Error(`Failed to start vitest: ${error.message}`));
    });

    vitestProcess.on("close", (code) => {
      try {
        // Parse the JSON output from Vitest
        const result = JSON.parse(stdout.split("\n")[0]);
        resolve(result);
      } catch (err) {
        // Return raw output if parsing fails
        resolve({
          success: code === 0,
          raw: stdout,
          parseError: "Could not parse Vitest output as JSON",
        });
      }
    });
  });
}

if (process.argv.some((arg) => arg === "--metaTest=vitest")) {
  runVitest(undefined, undefined, frontendProjectRoot).then((r) =>
    console.log(JSON.stringify(r))
  );
}

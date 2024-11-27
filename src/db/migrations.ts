import { exec } from "node:child_process";

export async function runMigrations() {
  // This code runs the npm script 'db-migrate:up' to make sure all migrations are done
  console.log("Running migrations via child process");
  return new Promise<void>((resolve, reject) => {
    exec("npm run db-migrate:up", (error, stdout, stderr) => {
      stdout && console.log(stdout);
      stderr && console.error(stderr);
      if (error) {
        console.error(`Error running migrations: ${error}`);
        reject(error);
      } else {
        resolve();
      }
      console.log("Migrations done");
    });
  });
}

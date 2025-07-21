import { repopulateDB } from "@dev/populateDB";
import { runMigrations } from "@db/migrations";
import { exec } from "node:child_process";
import { BADGEHUB_P1M_NL, setDeploymentId } from "@shared/config/sharedConfig";

const overwriteMockupData = async () => {
  console.log("START overwriting mockup data...");
  exec("npm run overwrite-mockup-data").on("close", () => {
    console.log("DONE overwriting mockup data...");
  });
};

async function runWithMigrationFirst() {
  setDeploymentId(BADGEHUB_P1M_NL);
  console.log("Running migrations first...");
  await runMigrations();
  console.log("Running repopulateDB...");
  await repopulateDB();
  await overwriteMockupData();
}

runWithMigrationFirst().catch((e) => {
  console.error(e);
  throw e;
});

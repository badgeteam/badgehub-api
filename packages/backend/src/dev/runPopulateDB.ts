import { repopulateDB } from "@dev/populateDB";
import { runMigrations } from "@db/migrations";

async function runWithMigrationFirst() {
  console.log("Running migrations first...");
  await runMigrations();
  console.log("Running repopulateDB...");
  await repopulateDB();
}

runWithMigrationFirst().catch((e) => {
  console.error(e);
  throw e;
});

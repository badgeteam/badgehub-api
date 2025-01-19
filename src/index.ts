import app from "./app";
import { RegisterRoutes } from "./generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import { EXPRESS_PORT, NODE_ENV } from "@config";
import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { runMigrations } from "@db/migrations";
import setupPopulateDBApi from "./setupPopulateDBApi";

async function startServer() {
  disableWriteWhenNotDev(app);

  if (NODE_ENV === "development") {
    setupPopulateDBApi(app);
  }

  RegisterRoutes(app);

  addTsoaValidationFailureLogging(app);

  await runMigrations();
  app.listen(EXPRESS_PORT, () => {
    console.info(`Node.js server started.`);
  });
}

// noinspection JSIgnoredPromiseFromCall
startServer();

import { EXPRESS_PORT, IS_DEV_ENV } from "@config";
// TODO: enable when disableWriteWhenNotDev is available
// import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { runMigrations } from "@db/migrations";
import { createExpressServer } from "@createExpressServer";

async function startServer() {
  const app = createExpressServer();

  await runMigrations();
  app.listen(EXPRESS_PORT, () => {
    console.info(
      `Node.js server started with settings port [${EXPRESS_PORT}], IS_DEV_ENV [${IS_DEV_ENV}].\nApp available at http://localhost:${EXPRESS_PORT}/`
    );
  });
}

// noinspection JSIgnoredPromiseFromCall
startServer();

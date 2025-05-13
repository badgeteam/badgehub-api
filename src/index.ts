import { EXPRESS_PORT, NODE_ENV } from "@config";
// TODO: enable when disableWriteWhenNotDev is available
// import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { runMigrations } from "@db/migrations";
import { createExpressServer } from "@createExpressServer";

async function startServer() {
  const app = createExpressServer();

  await runMigrations();
  app.listen(EXPRESS_PORT, () => {
    console.info(
      `Node.js server started. Listening on port ${EXPRESS_PORT}, environment: ${NODE_ENV}`
    );
  });
}

// noinspection JSIgnoredPromiseFromCall
startServer();

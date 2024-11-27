import app from "./app";
import { RegisterRoutes } from "./generated/routes";
import { EXPRESS_PORT } from "@config";

async function startServer() {
  RegisterRoutes(app);

  app.listen(EXPRESS_PORT, () => {
    console.info(`Node.js server started.`);
  });
}

startServer();

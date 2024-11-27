import app from "./app";
import { RegisterRoutes } from "./generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import { EXPRESS_PORT } from "@config";

async function startServer() {
  RegisterRoutes(app);

  addTsoaValidationFailureLogging(app);

  app.listen(EXPRESS_PORT, () => {
    console.info(`Node.js server started.`);
  });
}

startServer();

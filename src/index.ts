import app from "./app";
import { RegisterRoutes } from "./generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import { EXPRESS_PORT } from "@config";
import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";

disableWriteWhenNotDev(app);

RegisterRoutes(app);

addTsoaValidationFailureLogging(app);

app.listen(EXPRESS_PORT, () => {
  console.info(`Node.js server started.`);
});

import { config } from "dotenv";
import app from "./app";
import { RegisterRoutes } from "./generated/routes";

config();
RegisterRoutes(app);

const port = 8081;

app.listen(port, () => {
  console.info(`Node.js server started.`);
});

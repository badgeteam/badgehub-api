import { config } from "dotenv";
import app from "./app";

config();

const port = 8081;

app.listen(port, () => {
  console.info(`Node.js server started.`);
});

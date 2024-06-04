import express from "express";
import { RegisterRoutes } from "./generated/routes.js";
import openapi from "./openapi.js";
import { pinoHttp } from "pino-http";

const app = express();
const port = 8081;
const pino = pinoHttp();

app.use(express.json());
app.use(express.static("public"));
app.use(pino);

app.listen(port, () => {
  console.info(`Node.js server started.`);
});

RegisterRoutes(app);

openapi(app);

import express from "express";
import { RegisterRoutes } from "./generated/routes";
import openapi from "./openapi";
import { pinoHttp } from "pino-http";

const app = express();
const pino = pinoHttp();

app.use(express.json());
app.use(express.static("public"));
app.use(pino);

RegisterRoutes(app);

openapi(app);

export default app;

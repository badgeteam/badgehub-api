import { RegisterRoutes } from "./generated/routes";
import { EXPRESS_PORT, NODE_ENV } from "@config";
// TODO: enable when disableWriteWhenNotDev is available
// import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { runMigrations } from "@db/migrations";
import express, { NextFunction } from "express";
import openapi from "./openapi";
import { pinoHttp } from "pino-http";
import { jwtErrorHandler } from "@auth/jwt-error";

async function startServer() {
  const app = express();
  const pino = pinoHttp();

  console.log(">>> Starting server...");

  app.use(express.json());
  app.use(express.static("public"));
  // app.use(pino);

  // TODO: correct middleware
  // https://expressjs.com/en/guide/using-middleware.html
  // app.use(testJwtMiddleware);

  openapi(app);

  // disableWriteWhenNotDev(app);

  RegisterRoutes(app);

  app.use(jwtErrorHandler);

  // addTsoaValidationFailureLogging(app);

  await runMigrations();
  app.listen(EXPRESS_PORT, () => {
    console.info(
      `Node.js server started. Listening on port ${EXPRESS_PORT}, environment: ${NODE_ENV}`
    );
  });
}

// noinspection JSIgnoredPromiseFromCall
startServer();

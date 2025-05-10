import { RegisterRoutes } from "./generated/routes";
import { EXPRESS_PORT, NODE_ENV } from "@config";
// TODO: enable when disableWriteWhenNotDev is available
// import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { runMigrations } from "@db/migrations";
import express, { NextFunction } from "express";
import openapi from "./openapi";
import { pinoHttp } from "pino-http";
import { jwtErrorHandler } from "@auth/jwt-error";
import rateLimit from "express-rate-limit";

async function startServer() {
  const app = express();
  const pino = pinoHttp();

  console.log(">>> Starting server...");

  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per windowMs
  });

  app.use(express.json());
  app.use(express.static("public"));
  // app.use(pino);
  app.use(rateLimiter);

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

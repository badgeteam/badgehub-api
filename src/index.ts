import { RegisterRoutes } from "./generated/routes";
import { EXPRESS_PORT, NODE_ENV } from "@config";
import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { runMigrations } from "@db/migrations";
import express, { NextFunction } from "express";
import openapi from "./openapi";
import { pinoHttp } from "pino-http";
import { ForbiddenError } from "@controllers/public-rest";
import { JOSEError, JWTExpired } from "jose/dist/types/util/errors";

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

  disableWriteWhenNotDev(app);

  RegisterRoutes(app);

  app.use(errorHandler);

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

// Handle TSOA errors
export function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const jwtError = err as JOSEError & { status: number };

  if (jwtError.status !== 200) {
    return res.status(401).json({
      status: jwtError.status,
      message: "Please login first",
    } as ForbiddenError);
  } else {
    next();
  }
}

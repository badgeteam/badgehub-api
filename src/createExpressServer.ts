import express from "express";
import { pinoHttp } from "pino-http";
import { disableMutatingRest } from "@disableMutatingRest";
import openapi from "@openapi";
import { RegisterRoutes } from "@generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import multer from "multer";
import { NODE_ENV, MAX_UPLOAD_FILE_SIZE_BYTES } from "@config";
// TODO: enable when disableWriteWhenNotDev is available
// import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import { jwtErrorHandler } from "@auth/jwt-error";
import rateLimit from "express-rate-limit";

export const createExpressServer = (
  enableMutation = NODE_ENV === "development"
) => {
  const app = express();

  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per windowMs
  });
  app.use(rateLimiter);

  if (!enableMutation) {
    disableMutatingRest(app);
  }

  app.use(express.json());
  app.use(express.static("public"));

  const pino = pinoHttp();
  app.use(pino);

  openapi(app);

  RegisterRoutes(app, {
    multer: multer({ limits: { fileSize: MAX_UPLOAD_FILE_SIZE_BYTES } }),
  });

  app.use(jwtErrorHandler);

  addTsoaValidationFailureLogging(app);

  return app;
};

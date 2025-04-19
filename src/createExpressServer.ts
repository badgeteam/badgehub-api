import express from "express";
import { pinoHttp } from "pino-http";
import { disableMutatingRest } from "@disableMutatingRest";
import openapi from "@openapi";
import { RegisterRoutes } from "@generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import { NODE_ENV } from "@config";
import multer from "multer";
import { MAX_UPLOAD_FILE_SIZE_BYTES } from "@config";

export const createExpressServer = (
  enableMutation = NODE_ENV === "development"
) => {
  const app = express();
  app.use((req, res, next) => {
    next(); // for inspection during development
  });
  const pino = pinoHttp();
  if (!enableMutation) {
    disableMutatingRest(app);
  }

  app.use(express.json());
  app.use(express.static("public"));
  app.use(pino);

  openapi(app);

  RegisterRoutes(app, {
    multer: multer({ limits: { fileSize: MAX_UPLOAD_FILE_SIZE_BYTES } }),
  });

  addTsoaValidationFailureLogging(app);
  return app;
};

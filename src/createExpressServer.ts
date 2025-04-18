import express from "express";
import { pinoHttp } from "pino-http";
import { disableWriteWhenNotDev } from "@disableWriteWhenNotDev";
import openapi from "@openapi";
import { RegisterRoutes } from "@generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import multer from "multer";
import { MAX_UPLOAD_FILE_SIZE_BYTES } from "@config";

export const createExpressServer = () => {
  const app = express();
  const pino = pinoHttp();
  disableWriteWhenNotDev(app);

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

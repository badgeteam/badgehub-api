import express from "express";
import { pinoHttp } from "pino-http";
import openapi from "@openapi";
import { RegisterRoutes } from "@generated/routes";
import { addTsoaValidationFailureLogging } from "@util/logging";
import multer from "multer";
import { MAX_UPLOAD_FILE_SIZE_BYTES } from "@config";
import rateLimit from "express-rate-limit";

export const createExpressServer = () => {
  const app = express();
  app.use((req, res, next) => {
    next(); // for inspection during development
  });

  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per windowMs
  });
  app.use(rateLimiter);

  app.use(express.json());
  app.use(express.static("public"));

  const pino = pinoHttp();
  app.use(pino);

  openapi(app);

  RegisterRoutes(app, {
    multer: multer({ limits: { fileSize: MAX_UPLOAD_FILE_SIZE_BYTES } }),
  });

  addTsoaValidationFailureLogging(app);

  return app;
};

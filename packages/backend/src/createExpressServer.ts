import express from "express";
import { pinoHttp } from "pino-http";
import serveApiDocs from "@serveApiDocs";
import { FRONTEND_DIST_DIR, FRONTEND_PUBLIC_DIR, IS_DEV_ENV } from "@config";
import rateLimit from "express-rate-limit";
import { createExpressEndpoints } from "@ts-rest/express";
import { publicRestContracts } from "@shared/contracts/publicRestContracts";
import { createPublicRestRouter } from "@controllers/ts-rest/publicRestRouter";
import { privateRestContracts } from "@shared/contracts/privateRestContracts";
import { createPrivateRestRouter } from "@controllers/ts-rest/privateRestRouter";
import { addUserSubMiddleware } from "@auth/jwt-decode";
import { jwtVerifyTokenMiddleware } from "@auth/jwt-verify";
import cors from "cors";
import * as path from "path";
import { BADGEHUB_P1M_NL, setDeploymentId } from "@shared/config/sharedConfig";

export const createExpressServer = () => {
  setDeploymentId(BADGEHUB_P1M_NL); // TODO
  const app = express();
  if (IS_DEV_ENV) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      next(); // for inspection during development
    });
  }

  app.use(cors());

  app.use(express.json());
  app.use(express.static(FRONTEND_DIST_DIR));
  app.use(express.static(FRONTEND_PUBLIC_DIR));
  app.use("/page", (req, res, next) => {
    res.sendFile(path.join(FRONTEND_DIST_DIR, "index.html"));
  });

  const pino = pinoHttp();
  app.use(pino);

  serveApiDocs(app);

  const apiV3Router = express.Router();
  app.use("/api/v3", apiV3Router);
  createExpressEndpoints(
    publicRestContracts,
    createPublicRestRouter(),
    apiV3Router
  );

  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per windowMs
  });
  createExpressEndpoints(
    privateRestContracts,
    createPrivateRestRouter(),
    apiV3Router,
    {
      globalMiddleware: [
        jwtVerifyTokenMiddleware,
        addUserSubMiddleware,
        rateLimiter,
      ],
    }
  );
  app.use((err: any, req: any, res: any, next: any) => {
    console.warn(err);
    next(err);
  });
  return app;
};

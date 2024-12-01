import type { Express, NextFunction, Request, Response } from "express";
import { NODE_ENV } from "@config";

export function disableWriteWhenNotDev(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      if (NODE_ENV !== "development") {
        res
          .status(403)
          .send(
            "Write API is disabled in non-development environments for now"
          );
        return;
      }
    }
    next();
  });
}

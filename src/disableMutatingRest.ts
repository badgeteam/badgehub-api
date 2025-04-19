import { Express, NextFunction, Request, Response } from "express";

export function disableMutatingRest(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      res
        .status(403)
        .send("Write API is disabled in non-development environments for now");
      return;
    }
    next();
  });
}

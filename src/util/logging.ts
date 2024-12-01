import type { Express, NextFunction, Request, Response } from "express";
import { ValidateError } from "@tsoa/runtime";

export function addTsoaValidationFailureLogging(app: Express) {
  app.use(
    (err: unknown, _req: Request, _res: Response, next: NextFunction): void => {
      if (err instanceof ValidateError) {
        console.error(
          "Validation Error fields:",
          JSON.stringify(err.fields, null, 2)
        );
      }
      next(err);
    }
  );
}

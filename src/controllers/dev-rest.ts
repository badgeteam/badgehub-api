import { Middlewares, Post, Route, Tags } from "tsoa";
import { repopulateDB } from "@populateDB";
import { NODE_ENV } from "@config";

@Route("/api/dev")
@Tags("dev")
@Middlewares([
  async (req: any, res: any, next: any) => {
    if (NODE_ENV !== "development") {
      next(new Error("Dev API is disabled in non-development environments"));
    } else {
      next();
    }
  },
])
export class DevRestController {
  public constructor() {}

  /**
   * Repopulate the database with test data
   */
  @Post("/populate")
  public async rePopulateDB(): Promise<string> {
    console.log("Repopulating database...");
    await repopulateDB();
    return "Database re-population successful.";
  }
}

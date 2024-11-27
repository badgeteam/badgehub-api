import { Path, Post, Route, Tags } from "tsoa";
import { Badge } from "@domain/readModels/Badge";

@Route("/api/v3")
@Tags("public")
export class PrivateRestController {
  /**
   * Get list of devices (badges)
   */
  @Post("/apps/{slug}/version")
  public async createVersion(@Path() slug: string): Promise<Badge[]> {
    throw new Error("Not implemented");
  }
}

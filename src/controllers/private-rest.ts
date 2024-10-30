import { Path, Post, Route, Tags } from "tsoa";
import { Device } from "../db/models";

@Route("/api/v3")
@Tags("public")
export class PrivateRestController {
  /**
   * Get list of devices (badges)
   */
  @Post("/apps/{slug}/version")
  public async createVersion(@Path() slug: string): Promise<Device[]> {
    throw new Error("Not implemented");
  }
}

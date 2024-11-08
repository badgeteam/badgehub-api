import { Body, Path, Post, Put, Route, Tags } from "tsoa";
import { Pool } from "pg";
import { getPool } from "../db/connectionPool";
import type { BadgeHubDataPort } from "@domain/aggregates/BadgeHubDataPort";
import { BadgeHubDataPostgresAdapter } from "@db/ProjectAdapter";

@Route("/api/v3")
@Tags("private")
export class PrivateRestController {
  public constructor(
    private badgeHubData: BadgeHubDataPort = new BadgeHubDataPostgresAdapter()
  ) {}

  /**
   * Create a new app
   */
  @Post("/apps/{slug}") // TODO Fix this is not working yet, we get a 404
  public async createProject(@Path() slug: string): Promise<void> {
    await this.badgeHubData.createProject(slug);
  }

  /**
   * Create a new app
   */
  @Put("/apps/{slug}/file/{filePath}")
  public async writeFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Body() fileContent: string | Uint8Array
  ): Promise<void> {
    await this.badgeHubData.writeFile(slug, filePath, fileContent);
  }

  @Post("/apps/{slug}/version")
  public async publishVersion(@Path() slug: string) {
    await this.badgeHubData.publishVersion(slug);
  }
}

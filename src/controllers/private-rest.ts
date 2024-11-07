import { Body, Path, Post, Put, Route, Tags } from "tsoa";
import { Pool } from "pg";
import { getPool } from "../db/connectionPool";
import type { ProjectPort } from "@domain/aggregates/ProjectPort";
import { ProjectPostgresAdapter } from "@db/ProjectAdapter";

@Route("/api/v3")
@Tags("private")
export class PrivateRestController {
  public constructor(
    private projectAdapter: ProjectPort = new ProjectPostgresAdapter()
  ) {}

  /**
   * Create a new app
   */
  @Post("/apps/{slug}") // TODO Fix this is not working yet, we get a 404
  public async createProject(@Path() slug: string): Promise<void> {
    await this.projectAdapter.createProject(slug);
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
    await this.projectAdapter.writeFile(slug, filePath, fileContent);
  }

  @Post("/apps/{slug}/version")
  public async publishVersion(@Path() slug: string) {
    await this.projectAdapter.publishVersion(slug);
  }
}

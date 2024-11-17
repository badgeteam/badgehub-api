import { Body, Patch, Path, Post, Route, Tags } from "tsoa";
import type { BadgeHubDataPort } from "@domain/BadgeHubDataPort";
import { BadgeHubDataPostgresAdapter } from "@db/BadgeHubDataPostgresAdapter";
import type { DBInsertUser, DBUser } from "@db/models/app/DBUser";
import type { DBInsertProject, DBProject } from "@db/models/app/DBProject";
import { Version } from "@domain/readModels/app/Version";

// TODO verify author against logged in user

@Route("/api/v3")
@Tags("private")
export class PrivateRestController {
  public constructor(
    private badgeHubData: BadgeHubDataPort = new BadgeHubDataPostgresAdapter()
  ) {}

  /**
   * Create a new user
   */
  @Post("/users/{userId}")
  public async insertUser(
    @Path() userId: DBUser["id"],
    @Body() props: Omit<DBInsertUser, "id">
  ): Promise<void> {
    await this.badgeHubData.insertUser({ ...props, id: userId });
  }

  /**
   * Create a new app
   */
  @Post("/apps/{slug}")
  public async insertProject(
    @Path() slug: DBProject["slug"],
    @Body() props: Omit<DBInsertProject, "slug">
  ): Promise<void> {
    await this.badgeHubData.insertProject({ ...props, slug });
  }

  /**
   * Create a new app
   */
  @Patch("/apps/{slug}")
  public async updateProject(
    @Path() slug: DBProject["slug"],
    @Body() changes: Partial<Omit<DBProject, "slug">>
  ): Promise<void> {
    await this.badgeHubData.updateProject(slug, changes);
  }

  /**
   * Upload a file to the latest draft version of the project.
   */
  @Post("/apps/{slug}/file/{filePath}")
  public async writeFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Body() fileContent: string | Uint8Array
  ): Promise<void> {
    await this.badgeHubData.writeFile(slug, filePath, fileContent);
  }

  /**
   * Upload a file to the latest draft version of the project.
   */
  @Post("/apps/{slug}/zip")
  public async writeZip(
    @Path() slug: string,
    @Body() zipContent: Uint8Array
  ): Promise<Version> {
    return await this.badgeHubData.writeProjectZip(slug, zipContent);
  }

  /**
   * Publish the latest draft version
   */
  @Post("/apps/{slug}/version")
  public async publishVersion(@Path() slug: string) {
    await this.badgeHubData.publishVersion(slug);
  }
}

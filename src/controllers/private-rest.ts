import { Body, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import type { BadgeHubDataPort } from "@domain/BadgeHubDataPort";
import { BadgeHubDataPostgresAdapter } from "@db/BadgeHubDataPostgresAdapter";
import type { DBInsertUser, DBUser } from "@db/models/app/DBUser";
import type { DBInsertProject, DBProject } from "@db/models/app/DBProject";
import type { Version } from "@domain/readModels/app/Version";
import type { DBInsertAppMetadataJSON } from "@db/models/app/DBAppMetadataJSON";

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
  @Delete("/apps/{slug}")
  public async deleteProject(@Path() slug: DBProject["slug"]): Promise<void> {
    await this.badgeHubData.deleteProject(slug);
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
  @Post("/apps/{slug}/files/draft/{filePath}")
  public async writeFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Body() fileContent: string | Uint8Array
  ): Promise<void> {
    await this.badgeHubData.writeFile(slug, filePath, fileContent);
  }

  /**
   * Change the metadata of the latest draft version of the project.
   */
  @Patch("/apps/{slug}/metadata/draft")
  public async changeAppMetadata(
    @Path() slug: string,
    @Body() appMetadataChanges: Partial<DBInsertAppMetadataJSON>
  ): Promise<void> {
    await this.badgeHubData.updateDraftMetadata(slug, appMetadataChanges);
  }

  /**
   * get the latest draft version of the project.
   */
  @Get("/apps/{slug}/files/draft/{filePath}")
  public async getDraftFile(
    @Path() slug: string,
    @Path() filePath: string
  ): Promise<Uint8Array> {
    return await this.badgeHubData.getFileContents(slug, "draft", filePath);
  }

  /**
   * get the latest draft version of the app in zip format
   */
  @Get("/apps/{slug}/zip/draft")
  public async getLatestPublishedZip(
    @Path() slug: string
  ): Promise<Uint8Array> {
    return await this.badgeHubData.getVersionZipContents(slug, "draft");
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
  @Patch("/apps/{slug}/publish")
  public async publishVersion(@Path() slug: string) {
    await this.badgeHubData.publishVersion(slug);
  }
}

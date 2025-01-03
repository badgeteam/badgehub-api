import {
  Body,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  Tags,
  UploadedFile,
} from "tsoa";
import { BadgeHubData } from "@domain/BadgeHubData";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";
import type { ProjectSlug } from "@domain/readModels/app/Project";
import type { DBInsertUser, DBUser } from "@db/models/app/DBUser";
import type { DBInsertProject } from "@db/models/app/DBProject";
import type { DBInsertAppMetadataJSON } from "@db/models/app/DBAppMetadataJSON";
import { NodeFSBadgeHubFiles } from "@fs/NodeFSBadgeHubFiles";

interface UserProps extends Omit<DBInsertUser, "id"> {}

interface ProjectProps extends Omit<DBInsertProject, "slug"> {}

interface ProjectPropsPartial extends Partial<ProjectProps> {}

interface DbInsertAppMetadataJSONPartial
  extends Partial<DBInsertAppMetadataJSON> {}

// TODO verify user_name against logged in user
@Route("/api/v3")
@Tags("private")
export class PrivateRestController {
  public constructor(
    private badgeHubData: BadgeHubData = new BadgeHubData(
      new PostgreSQLBadgeHubMetadata(),
      new NodeFSBadgeHubFiles()
    )
  ) {}

  /**
   * Create a new user
   */
  @Post("/users/{userId}")
  public async insertUser(
    @Path() userId: DBUser["id"],
    @Body() props: UserProps
  ): Promise<void> {
    // TODO implement with proper password handling (salting, hashing, ...)
    throw new Error("Not implemented");
  }

  /**
   * Create a new app
   */
  @Post("/apps/{slug}")
  public async createApp(
    @Path() slug: ProjectSlug,
    @Body() props: ProjectProps
  ): Promise<void> {
    await this.badgeHubData.insertProject({ ...props, slug });
  }

  /**
   * Create a new app
   */
  @Delete("/apps/{slug}")
  public async deleteApp(@Path() slug: ProjectSlug): Promise<void> {
    await this.badgeHubData.deleteProject(slug);
  }

  /**
   * Create a new app
   */
  @Patch("/apps/{slug}")
  public async updateApp(
    @Path() slug: ProjectSlug,
    @Body() changes: ProjectPropsPartial
  ): Promise<void> {
    await this.badgeHubData.updateProject(slug, changes);
  }

  /**
   * Upload a file to the latest draft version of the project.
   */
  @Post("/apps/{slug}/draft/files/{filePath}")
  public async writeDraftFile(
    @Path() slug: string,
    @Path() filePath: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    await this.badgeHubData.writeDraftFile(slug, filePath, {
      mimetype: file.mimetype,
      fileContent: file.buffer,
      directory: file.destination,
      fileName: file.filename,
      size: file.size,
    });
  }

  /**
   * Change the metadata of the latest draft version of the project.
   */
  @Patch("/apps/{slug}/draft/metadata")
  public async changeDraftAppMetadata(
    @Path() slug: string,
    @Body() appMetadataChanges: DbInsertAppMetadataJSONPartial
  ): Promise<void> {
    await this.badgeHubData.updateDraftMetadata(slug, appMetadataChanges);
  }

  /**
   * get the latest draft version of the project.
   */
  @Get("/apps/{slug}/draft/files/{filePath}")
  public async getDraftFile(
    @Path() slug: string,
    @Path() filePath: string
  ): Promise<Uint8Array> {
    return await this.badgeHubData.getFileContents(slug, "draft", filePath);
  }

  /**
   * get the latest draft version of the app in zip format
   */
  @Get("/apps/{slug}/draft/zip")
  public async getLatestPublishedZip(
    @Path() slug: string
  ): Promise<Uint8Array> {
    return await this.badgeHubData.getVersionZipContents(slug, "draft");
  }

  /**
   * Upload a file to the latest draft version of the project.
   */
  @Post("/apps/{slug}/draft/zip")
  public async writeZip(
    @Path() slug: string,
    @Body() zipContent: Uint8Array
  ): Promise<void> {
    await this.badgeHubData.writeDraftProjectZip(slug, zipContent);
  }

  /**
   * Publish the latest draft version
   */
  @Patch("/apps/{slug}/publish")
  public async publishVersion(@Path() slug: string): Promise<void> {
    await this.badgeHubData.publishVersion(slug);
  }
}

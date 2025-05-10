import {
  Body,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Res,
  Route,
  Tags,
  type TsoaResponse,
  UploadedFile,
} from "tsoa";
import { BadgeHubData } from "@domain/BadgeHubData";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";
import {
  Project,
  type ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/project/Project";
import type { DBInsertUser, DBUser } from "@db/models/project/DBUser";
import type { DBInsertProject } from "@db/models/project/DBProject";
import type { DBInsertAppMetadataJSON } from "@db/models/project/DBAppMetadataJSON";
import { Readable } from "node:stream";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";
import type { CreateProjectProps } from "@domain/writeModels/project/WriteProject";

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
      new PostgreSQLBadgeHubFiles()
    )
  ) {}

  /**
   * Get all draft projects that the given user has access to.
   */
  @Get("/users/{userId}/drafts")
  public async getUserDraftProjects(
    @Path() userId: DBUser["id"],
    @Query() pageStart?: number,
    @Query() pageLength?: number
  ): Promise<ProjectWithoutVersion[]> {
    return this.badgeHubData.getProjects(
      { pageStart, pageLength, userId },
      "draft"
    );
  }

  /**
   * Create a new project
   */
  @Post("/projects/{slug}")
  public async createProject(
    @Path() slug: ProjectSlug,
    @Body() props: Omit<CreateProjectProps, "slug">
  ): Promise<void> {
    await this.badgeHubData.insertProject({ ...props, slug });
  }

  /**
   * Create a new project
   */
  @Delete("/projects/{slug}")
  public async deleteProject(@Path() slug: ProjectSlug): Promise<void> {
    await this.badgeHubData.deleteProject(slug);
  }

  /**
   * Create a new project
   */
  @Patch("/projects/{slug}")
  public async updateProject(
    @Path() slug: ProjectSlug,
    @Body() changes: ProjectPropsPartial
  ): Promise<void> {
    await this.badgeHubData.updateProject(slug, changes);
  }

  /**
   * Upload a file to the latest draft version of the project.
   * Note that the filePath needs to be url encoded.
   */
  @Post("/projects/{slug}/draft/files/{filePath}")
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
   * Delete the given file from the latest draft version of the project.
   * Note that the filePath needs to be url encoded.
   * Note that the metadata.json file cannot be deleted
   */
  @Delete("/projects/{slug}/draft/files/{filePath}")
  public async deleteDraftFile(
    @Path() slug: string,
    @Path() filePath: string
  ): Promise<void> {
    await this.badgeHubData.deleteDraftFile(slug, filePath);
  }

  /**
   * Change the metadata of the latest draft version of the project.
   */
  @Patch("/projects/{slug}/draft/metadata")
  public async changeDraftAppMetadata(
    @Path() slug: string,
    @Body() appMetadataChanges: DbInsertAppMetadataJSONPartial
  ): Promise<void> {
    await this.badgeHubData.updateDraftMetadata(slug, appMetadataChanges);
  }

  /**
   * get the latest draft version of the project.
   */
  @Get("/projects/{slug}/draft/files/{filePath}")
  public async getDraftFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Readable> {
    const fileContents = await this.badgeHubData.getFileContents(
      slug,
      "draft",
      filePath
    );
    if (!fileContents) {
      return notFoundResponse(404, {
        reason: `No project with slug '${slug}' found`,
      });
    }
    return Readable.from(fileContents);
  }

  /**
   * Get Project details of the draft version of the project
   */
  @Get("/projects/{slug}/draft")
  public async getDraftProject(
    @Path() slug: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Project | undefined> {
    const details = await this.badgeHubData.getDraftProject(slug);
    if (!details) {
      return notFoundResponse(404, {
        reason: `No project with slug '${slug}' found`,
      });
    }
    return details;
  }

  /**
   * Publish the current draft as a new version
   */
  @Patch("/projects/{slug}/publish")
  public async publishVersion(@Path() slug: string): Promise<void> {
    await this.badgeHubData.publishVersion(slug);
  }
}

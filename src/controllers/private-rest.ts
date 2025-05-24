import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
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
import {
  addUserSubMiddleware,
  ensureContributorRouteMiddleware,
} from "@auth/jwt";
import { DISABLE_AUTH } from "@config";

interface UserProps extends Omit<DBInsertUser, "id"> {}

interface ProjectProps extends Omit<DBInsertProject, "slug"> {}

interface ProjectPropsPartial extends Partial<ProjectProps> {}

interface DbInsertAppMetadataJSONPartial
  extends Partial<DBInsertAppMetadataJSON> {}

const HTTP_NOT_FOUND = 404;
const HTTP_FORBIDDEN = 403;

type BadRequestCallback = TsoaResponse<404 | 403, { reason: string }>;

@Route("/api/v3")
@Tags("private")
@Middlewares(
  ...(DISABLE_AUTH ? [] : [ensureContributorRouteMiddleware]),
  addUserSubMiddleware
)
export class PrivateRestController extends Controller {
  public constructor(
    private badgeHubData: BadgeHubData = new BadgeHubData(
      new PostgreSQLBadgeHubMetadata(),
      new PostgreSQLBadgeHubFiles()
    )
  ) {
    super();
  }

  /**
   * Get all draft projects that the given user has access to.
   */
  @Get("/users/{userId}/drafts")
  public async getUserDraftProjects(
    @Path() userId: DBUser["id"],
    @Res() badRequestCallback: TsoaResponse<403, { reason: string }>,
    @Query() pageStart?: number,
    @Query() pageLength?: number
  ): Promise<ProjectWithoutVersion[] | unknown> {
    const badRequestResponse = this.checkUserAuthorization(
      userId,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
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
  public async deleteProject(
    @Path() slug: ProjectSlug,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<void> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
    await this.badgeHubData.deleteProject(slug);
  }

  /**
   * Create a new project
   */
  @Patch("/projects/{slug}")
  public async updateProject(
    @Path() slug: ProjectSlug,
    @Body() changes: ProjectPropsPartial,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<void> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
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
    @UploadedFile() file: Express.Multer.File,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<undefined> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
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
    @Path() filePath: string,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<void> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
    await this.badgeHubData.deleteDraftFile(slug, filePath);
  }

  /**
   * Change the metadata of the latest draft version of the project.
   */
  @Patch("/projects/{slug}/draft/metadata")
  public async changeDraftAppMetadata(
    @Path() slug: string,
    @Body() appMetadataChanges: DbInsertAppMetadataJSONPartial,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<void> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
    await this.badgeHubData.updateDraftMetadata(slug, appMetadataChanges);
  }

  /**
   * get the latest draft version of the project.
   */
  @Get("/projects/{slug}/draft/files/{filePath}")
  public async getDraftFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<Readable> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
    const fileContents = await this.badgeHubData.getFileContents(
      slug,
      "draft",
      filePath
    );
    if (!fileContents) {
      return badRequestCallback(HTTP_NOT_FOUND, {
        reason: `No project with slug '${slug}' found`,
      });
    }
    this.setHeader(
      "Content-Disposition",
      `attachment; filename=${filePath.split("/").at(-1)}`
    );
    return Readable.from(fileContents);
  }

  /**
   * Get Project details of the draft version of the project
   */
  @Get("/projects/{slug}/draft")
  public async getDraftProject(
    @Path() slug: string,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<Project | undefined> {
    const details = await this.badgeHubData.getDraftProject(slug);
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback,
      details
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
    if (!details) {
      return badRequestCallback(HTTP_NOT_FOUND, {
        reason: `No project with slug '${slug}' found`,
      });
    }
    return details;
  }

  /**
   * Publish the current draft as a new version
   */
  @Patch("/projects/{slug}/publish")
  public async publishVersion(
    @Path() slug: string,
    @Res() badRequestCallback: BadRequestCallback
  ): Promise<void> {
    const badRequestResponse = await this.checkProjectAuthorization(
      slug,
      badRequestCallback
    );
    if (badRequestResponse !== "OK") {
      return badRequestResponse;
    }
    await this.badgeHubData.publishVersion(slug);
  }

  private requestIsFromAllowedUser(param: { allowedUsers: number[] }) {
    const headers: Headers = this.getHeaders();
    // TODO check that user in JWT token in an allowed user
    // In case false is returned, make a log on the server with the user who did it
    return true;
  }

  private async checkProjectAuthorization(
    slug: ProjectSlug,
    badRequestCallback: BadRequestCallback,
    project?: Project
  ) {
    project = project ?? (await this.badgeHubData.getDraftProject(slug));
    if (!project) {
      return badRequestCallback(HTTP_NOT_FOUND, {
        reason: `No project with slug '${slug}' found`,
      });
    }
    if (!this.requestIsFromAllowedUser({ allowedUsers: [project?.user_id] })) {
      return badRequestCallback(HTTP_FORBIDDEN, {
        reason: `The user in the JWT token is not authorized for project with slug '${slug}'`,
      });
    }
    return "OK";
  }

  private checkUserAuthorization(
    userId: number,
    badRequestCallback: TsoaResponse<403, { reason: string }>
  ): "OK" | unknown {
    if (!this.requestIsFromAllowedUser({ allowedUsers: [userId] })) {
      return badRequestCallback(HTTP_FORBIDDEN, {
        reason: `You are not allowed to access the draft projects of user with id '${userId}'`,
      });
    }
    return "OK";
  }
}

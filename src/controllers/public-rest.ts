import { Controller, type TsoaResponse } from "tsoa";
import { Get, Path, Query, Res, Route, Tags } from "tsoa";
import { BadgeHubData } from "@domain/BadgeHubData";
import {
  Project,
  ProjectWithoutVersion,
} from "@domain/readModels/project/Project";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";

import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/project/Category";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";
import { Readable } from "node:stream";
import type { RevisionNumber } from "@domain/readModels/project/Version";

/**
 * The code is annotated so that OpenAPI documentation can be generated with tsoa
 *
 * https://tsoa-community.github.io/docs/introduction.html
 * https://node-postgres.com/
 * https://www.postgresql.org/docs/16/index.html
 *
 * After changing this file, don't forget to generate the OpenPI spec en the routes:
 *
 * npm run swagger
 */

@Route("/api/v3")
@Tags("public")
export class PublicRestController extends Controller {
  public constructor(
    private badgeHubData: BadgeHubData = new BadgeHubData(
      new PostgreSQLBadgeHubMetadata(),
      new PostgreSQLBadgeHubFiles()
    )
  ) {
    super();
  }

  /**
   * Get list of devices (badges)
   */
  @Get("/devices")
  public async getDevices(): Promise<Badge[]> {
    return await this.badgeHubData.getBadges();
  }

  /**
   * Get list of categories
   */
  @Get("/categories")
  public async getCategories(): Promise<Category[]> {
    return await this.badgeHubData.getCategories();
  }

  /**
   * Get list of projects, optionally limited by page start/length and/or filtered by categorySlug
   */
  @Get("/projects")
  public async getProjects(
    @Query() pageStart?: number,
    @Query() pageLength?: number,
    @Query() category?: Category["slug"],
    @Query() device?: string
  ): Promise<ProjectWithoutVersion[]> {
    return await this.badgeHubData.getProjects(
      {
        pageStart,
        pageLength,
        badgeSlug: device,
        categorySlug: category,
      },
      "latest"
    );
  }

  /**
   * Get project details for a specific published revision of the project
   */
  @Get("/projects/{slug}/rev{revision}")
  public async getProjectVersion(
    @Path() slug: string,
    @Path() revision: RevisionNumber,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Project | undefined> {
    const details = await this.badgeHubData.getPublishedProject(slug, revision);
    if (!details) {
      return notFoundResponse(404, {
        reason: `No public app with slug '${slug}' found`,
      });
    }
    return details;
  }

  /**
   * Get project details of the latest published version
   */
  @Get("/projects/{slug}")
  public async getProject(
    @Path() slug: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Project | undefined> {
    const details = await this.badgeHubData.getPublishedProject(slug, "latest");
    if (!details) {
      return notFoundResponse(404, {
        reason: `No public app with slug '${slug}' found`,
      });
    }
    return details;
  }

  /**
   * get the latest published version of a file in the project
   */
  @Get("/projects/{slug}/latest/files/{filePath}")
  public async getLatestPublishedFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Readable> {
    const file = await this.badgeHubData.getFileContents(
      slug,
      "latest",
      filePath
    );
    if (!file) {
      return notFoundResponse(404, {
        reason: `No app with slug '${slug}' found`,
      });
    }
    this.setHeader(
      "Content-Disposition",
      `attachment; filename=${filePath.split("/").at(-1)}`
    );
    return Readable.from(file);
  }

  /**
   * get a file for a specific version of the project
   */
  @Get(`/projects/{slug}/rev{revision}/files/{filePath}`)
  public async getFileForVersion(
    @Path() slug: string,
    @Path() revision: RevisionNumber,
    @Path() filePath: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Readable> {
    const file = await this.badgeHubData.getFileContents(
      slug,
      revision,
      filePath
    );
    if (!file) {
      return notFoundResponse(404, {
        reason: `No project with slug '${slug}' found`,
      });
    }
    return Readable.from(file);
  }
}

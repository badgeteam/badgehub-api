import type { TsoaResponse } from "tsoa";
import { Get, Path, Query, Res, Route, Tags } from "tsoa";
import { BadgeHubData } from "@domain/BadgeHubData";
import { Project, ProjectWithoutVersion } from "@domain/readModels/app/Project";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";

import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/app/Category";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";
import { Readable } from "node:stream";
import type {
  RevisionNumber,
  RevisionNumberOrAlias,
} from "@domain/readModels/app/Version";

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
export class PublicRestController {
  public constructor(
    private badgeHubData: BadgeHubData = new BadgeHubData(
      new PostgreSQLBadgeHubMetadata(),
      new PostgreSQLBadgeHubFiles()
    )
  ) {}

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
   * Get list of apps, optionally limited by page start/length and/or filtered by categorySlug
   */
  @Get("/apps")
  public async getApps(
    @Query() pageStart?: number,
    @Query() pageLength?: number,
    @Query() category?: Category["slug"],
    @Query() device?: string
  ): Promise<ProjectWithoutVersion[]> {
    return await this.badgeHubData.getProjects({
      pageStart,
      pageLength,
      badgeSlug: device,
      categorySlug: category,
    });
  }

  /**
   * Get app details for a specific published revision of the app
   */
  @Get("/apps/{slug}/rev{revision}")
  public async getAppVersion(
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
   * Get app details of the latest published version
   */
  @Get("/apps/{slug}")
  public async getApp(
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
  @Get("/apps/{slug}/latest/files/{filePath}")
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
    return Readable.from(file);
  }

  /**
   * get a file for a specific version of the project
   */
  @Get(`/apps/{slug}/rev{revision}/files/{filePath}`)
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
        reason: `No app with slug '${slug}' found`,
      });
    }
    return Readable.from(file);
  }

  /**
   * get the latest published version of the app in zip format
   */
  @Get("/apps/{slug}/zip/latest")
  public async getLatestPublishedZip(@Path() slug: string): Promise<Readable> {
    return Readable.from(
      await this.badgeHubData.getVersionZipContents(slug, "latest")
    );
  }

  /**
   * get the app zip for a specific version of the project
   */
  @Get(`/apps/{slug}/zip/rev{revision}`)
  public async getZipForVersion(
    @Path() slug: string,
    @Path() revision: number
  ): Promise<Readable> {
    return Readable.from(
      await this.badgeHubData.getVersionZipContents(slug, revision)
    );
  }
}

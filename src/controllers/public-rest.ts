import type { TsoaResponse } from "tsoa";
import { Get, Path, Query, Res, Route, Tags } from "tsoa";
import type { BadgeHubDataPort } from "@domain/aggregates/BadgeHubDataPort";
import { Project } from "@domain/models/app/Project";
import { BadgeHubDataPostgresAdapter } from "@db/BadgeHubDataPostgresAdapter";

import { AppCategoryName } from "@domain/models/app/Category";
import { Badge } from "@domain/models/Badge";

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
    private badgeHubData: BadgeHubDataPort = new BadgeHubDataPostgresAdapter()
  ) {}

  /**
   * Get list of devices (badges)
   */
  @Get("/devices")
  public async getBadges(): Promise<Badge[]> {
    return await this.badgeHubData.getBadges();
  }

  /**
   * Get list of categories
   */
  @Get("/categories")
  public async getCategories(): Promise<AppCategoryName[]> {
    return await this.badgeHubData.getCategories();
  }

  /**
   * Get list of apps, optionally limited by page start/length and/or filtered by category
   */
  @Get("/apps")
  public async getProjects(
    @Query() pageStart?: number,
    @Query() pageLength?: number,
    @Query() category?: string,
    @Query() device?: string
  ): Promise<Project[]> {
    return await this.badgeHubData.getProjects({
      pageStart,
      pageLength,
      badgeSlug: device,
      appCategory: category as AppCategoryName,
    });
  }

  /**
   * Get app details
   */
  @Get("/apps/{slug}")
  public async getProject(
    @Path() slug: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<Project | undefined> {
    const details = await this.badgeHubData.getProject(slug);
    if (!details) {
      return notFoundResponse(404, {
        reason: `No app with slug '${slug}' found`,
      });
    }
    return details;
  }
}

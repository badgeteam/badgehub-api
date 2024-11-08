import pg, { Pool } from "pg";
import { Get, Path, Query, Res, Route, Tags } from "tsoa";
import type { TsoaResponse } from "tsoa";
import { getPool } from "@db/connectionPool";
import type { App, Category, Device } from "@db/models";
import type { ProjectPort } from "@domain/aggregates/ProjectPort";
import { Project } from "@domain/models/app/Project";
import { ProjectPostgresAdapter } from "@db/ProjectAdapter";

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
  private pool: Pool;

  public constructor(
    private projectAdapter: ProjectPort = new ProjectPostgresAdapter()
  ) {
    this.pool = getPool();
  }

  /**
   * Get list of devices (badges)
   */
  @Get("/devices")
  public async getDevices(): Promise<Device[]> {
    const result = await this.pool.query<Device>(
      `select name, slug from badges`
    );
    return result.rows;
  }

  /**
   * Get list of categories
   */
  @Get("/categories")
  public async getCategories(): Promise<Category[]> {
    const result = await this.pool.query<Category>(
      `select name, slug from categories`
    );
    return result.rows;
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
    return await this.projectAdapter.getProjects({
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
    const details = await this.projectAdapter.getProject(slug);
    if (!details) {
      return notFoundResponse(404, {
        reason: `No app with slug '${slug}' found`,
      });
    }
    return details;
  }
}

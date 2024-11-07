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
  public async getApps(
    @Query() pageStart?: number,
    @Query() pageLength?: number,
    @Query() category?: string,
    @Query() device?: string
  ): Promise<App[]> {
    const mainQuery = `
            select p.name, p.slug, c.slug as category_slug, u.name as user_name
            from projects p
            inner join categories c on p.category_id = c.id
            inner join users u on p.user_id = u.id`;

    const badgeQuery = `
            inner join badge_project bp on bp.project_id = p.id 
            inner join badges b on b.id = bp.badge_id`;

    let result: pg.QueryResult<App>;
    if (category && !device) {
      result = await this.pool.query<App>(
        `${mainQuery}
                where c.slug = $3
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0, category]
      );
    } else if (!category && device) {
      result = await this.pool.query<App>(
        `${mainQuery} ${badgeQuery}
                where b.slug=$3
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0, device]
      );
    } else if (category && device) {
      result = await this.pool.query<App>(
        `${mainQuery} ${badgeQuery}
                where c.slug = $3 and b.slug=$4
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0, category, device]
      );
    } else {
      result = await this.pool.query<App>(
        `${mainQuery}
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0]
      );
    }
    return result.rows;
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

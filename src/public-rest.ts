import pg from "pg";
import { Get, Path, Query, Res, Route } from "tsoa";
import type { TsoaResponse } from "tsoa";

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

const pool = new pg.Pool({
  host: "db",
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

interface Device {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
}

interface App {
  name: string;
  slug: string;
  category_slug: string;
  user_name: string;
}

interface AppDetails {
  name: string;
  slug: string;
  description: string;
  category_slug: string;
  user_name: string;
  devices: string[];
}

@Route("/api/v3")
export class RestController {
  /**
   * Get list of devices (badges)
   */
  @Get("/devices")
  public async getDevices(): Promise<Device[]> {
    const result = await pool.query<Device>(`select name, slug from badges`);
    return result.rows;
  }

  /**
   * Get list of categories
   */
  @Get("/categories")
  public async getCategories(): Promise<Category[]> {
    const result = await pool.query<Category>(
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
      result = await pool.query<App>(
        `${mainQuery}
                where c.slug = $3
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0, category]
      );
    } else if (!category && device) {
      result = await pool.query<App>(
        `${mainQuery} ${badgeQuery}
                where b.slug=$3
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0, device]
      );
    } else if (category && device) {
      result = await pool.query<App>(
        `${mainQuery} ${badgeQuery}
                where c.slug = $3 and b.slug=$4
                limit $1 offset $2
                `,
        [pageLength ?? null, pageStart ?? 0, category, device]
      );
    } else {
      result = await pool.query<App>(
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
  public async getAppDetails(
    @Path() slug: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<AppDetails | undefined> {
    const result = await pool.query<AppDetails & { id: number }>(
      `select p.id, p.name, p.slug, p.description, c.slug as category_slug, u.name as user_name
                             from projects p
                             inner join categories c on p.category_id = c.id
                             inner join users u on p.user_id = u.id
                             where p.slug = $1`,
      [slug]
    );
    if (result.rows[0]) {
      const projectId = result.rows[0].id;
      const badgeResult = await pool.query<AppDetails & { id: number }>(
        `select b.slug from badge_project bp inner join badges b on bp.badge_id=b.id where project_id=$1`,
        [projectId]
      );
      const devices = badgeResult.rows.map((badge) => badge.slug);
      const { id, ...resultWithoutId } = result.rows[0];
      return { ...resultWithoutId, devices };
    } else {
      return notFoundResponse(404, {
        reason: `No app with slug '${slug}' found`,
      });
    }
  }
}

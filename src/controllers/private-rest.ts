import { Body, Post, Put, Route, Tags } from "tsoa";
import { type AppDetails, type Category } from "../db/models";
import { Pool } from "pg";
import { getPool } from "../db/connectionPool";

@Route("/api/v3")
@Tags("public")
export class PrivateRestController {
  private pool: Pool;

  public constructor() {
    this.pool = getPool();
  }

  /**
   * Create a new app
   */
  @Post("/apps}") // TODO Fix this is not working yet, we get a 404
  public async createApp(@Body() app: AppDetails): Promise<void> {
    await this.pool.query<Category>(
      `insert into apps (name, slug, category_slug, user_name, description, devices) values ($1, $2, $3, $4, $5, $6)`,
      [
        app.name,
        app.slug,
        app.category_slug,
        app.user_name,
        app.description,
        app.devices,
      ]
    );
  }

  /**
   * Create a new app
   */
  @Put("/apps")
  public async changeApp(): Promise<void> {
    throw new Error("Not implemented");
  }
}

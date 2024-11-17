import { Body, Patch, Path, Post, Route, Tags } from "tsoa";
import type { BadgeHubDataPort } from "@domain/aggregates/BadgeHubDataPort";
import { BadgeHubDataPostgresAdapter } from "@db/BadgeHubDataPostgresAdapter";
import { ProjectCore } from "@domain/models/app/Project";
// TODO verify author against logged in user

@Route("/api/v3")
@Tags("private")
export class PrivateRestController {
  public constructor(
    private badgeHubData: BadgeHubDataPort = new BadgeHubDataPostgresAdapter()
  ) {}

  /**
   * Create a new app
   */
  @Post("/apps/{slug}")
  public async insertProject(
    @Path() slug: string,
    @Body() props: Omit<ProjectCore, "slug">
  ): Promise<void> {
    await this.badgeHubData.insertProject({ ...props, slug });
  }

  /**
   * Create a new app
   */
  @Patch("/apps/{slug}")
  public async updateProject(
    @Path() slug: string,
    @Body() changes: Partial<Omit<ProjectCore, "slug">>
  ): Promise<void> {
    await this.badgeHubData.updateProject(slug, changes);
  }

  /**
   * Upload a file to the latest draft version of the project.
   */
  @Post("/apps/{slug}/file/{filePath}")
  public async writeFile(
    @Path() slug: string,
    @Path() filePath: string,
    @Body() fileContent: string | Uint8Array
  ): Promise<void> {
    await this.badgeHubData.writeFile(slug, filePath, fileContent);
  }

  /**
   * Upload a file to the latest draft version of the project.
   */
  @Post("/apps/{slug}/zip")
  public async writeZip(
    @Path() slug: string,
    @Body() zipContent: Uint8Array
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  // Publish the latest draft version
  @Post("/apps/{slug}/version")
  public async publishVersion(@Path() slug: string) {
    await this.badgeHubData.publishVersion(slug);
  }
}

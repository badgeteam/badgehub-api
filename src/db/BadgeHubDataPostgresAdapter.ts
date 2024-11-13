import { BadgeHubDataPort } from "@domain/aggregates/BadgeHubDataPort";
import { Badge } from "@domain/models/Badge";
import { Project, ProjectSlug } from "@domain/models/app/Project";
import { User } from "@domain/models/app/User";
import { Version } from "@domain/models/app/Version";
import { AppCategoryName } from "@domain/models/app/Category";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import { DBProject as DBProject } from "@db/models/app/DBProject";
import { DBVersion as DBVersion } from "@db/models/app/DBVersion";
import sql from "sql-template-tag";
import { DBMetadataFileContents as DBMetadataFileContents } from "@db/models/app/DBMetadataFileContents";
import { MetadataFileContents } from "@domain/models/app/MetadataFileContents";
import { DBUser } from "@db/models/app/DBUser";

export class BadgeHubDataPostgresAdapter implements BadgeHubDataPort {
  private readonly pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  getCategories(): Promise<AppCategoryName[]> {
    throw new Error("Method not implemented.");
  }

  createProject(projectSlug: ProjectSlug): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteProject(projectSlug: ProjectSlug): Promise<void> {
    throw new Error("Method not implemented.");
  }

  publishUpdatedMetadata(changes: MetadataFileContents): Promise<void> {
    throw new Error("Method not implemented.");
  }

  writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  publishVersion(projectSlug: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getProject(projectSlug: string): Promise<Project> {
    throw new Error("Method not implemented.");
  }

  getVersion(projectSlug: string): Promise<Version> {
    throw new Error("Method not implemented.");
  }

  getUser(userEmail: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  updateUser(updatedUser: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getFileDownloadLink(
    projectSlug: string,
    versionRevision: number,
    filePath: string
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getVersionDownloadLink(
    projectSlug: string,
    versionRevision: number
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getBadges(): Promise<Badge[]> {
    return await this.pool
      .query(
        sql`SELECT name, slug
            from badges`
      )
      .then((res) => res.rows);
  }

  async getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: string;
    appCategory?: AppCategoryName;
  }): Promise<Project[]> {
    let query = sql`SELECT slug,
                           git,
                           allow_team_fixes,
                           p.created_at,
                           p.updated_at,
                           p.deleted_at,
                           v.semantic_version,
                           v.status,
                           v.git_commit_id,
                           v.published,
                           v.published_at,
                           v.revision,
                           v.size_of_zip,
                           m.description,
                           m.interpreter,
                           m.licence_file,
                           m.name, 
                           u.name as author_name
                    FROM projects p
                             LEFT JOIN users u on p.user_id = user.id
                             LEFT JOIN versions v ON p.version_id = v.id
                             LEFT JOIN metadata_file_contents m ON v.metadata_file_contents_id = m.id`;
    if (filter?.pageLength) {
      query = sql`${query}
      OFFSET
      ${filter.pageLength}`;
      if (filter.pageStart) {
        query = sql`${query}
        OFFSET
        ${filter.pageStart}`;
      }
    }
    const projects: (DBProject &
      DBVersion &
      DBMetadataFileContents & {
        author_name: DBUser["name"];
      })[] = await this.pool.query(query).then((res) => res.rows);
    return projects.map((dbProject): Project => {
      return {
        version: undefined, // TODO
        allow_team_fixes: false,
        author: dbProject.author_name, // todo maybe change to email, full id or object with multiple fields
        badges: [], // TODO
        category: dbProject.category || "uncategorized",
        collaborators: [], // TODO
        created_at: dbProject.created_at,
        updated_at: dbProject.updated_at,
        deleted_at: dbProject.deleted_at,
        description: dbProject.description,
        download_counter: undefined, // TODO
        git: dbProject.git,
        git_commit_id: dbProject.git_commit_id,
        interpreter: dbProject.interpreter,
        license: dbProject.license_file, // TODO check what we should do with the license, possibly we could say that this is either a path or 'MIT'|..., but then still we should read out the licens somewhere if it is a file.
        name: dbProject.name,
        published_at: dbProject.published_at, // TODO
        revision: dbProject.revision,
        size_of_content: undefined, // TODO
        size_of_zip: dbProject.size_of_zip,
        slug: dbProject.slug,
        states: undefined,
        status: undefined, // TODO
        user: undefined, // TODO
        versions: undefined, // TODO
        dependencies: undefined, // TODO
        votes: undefined, // TODO
        warnings: undefined, // TODO
      };
    });
  }
}

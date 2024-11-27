import { BadgeHubDataPort } from "@domain/BadgeHubDataPort";
import { Badge } from "@domain/readModels/Badge";
import {
  Project,
  ProjectCore,
  ProjectSlug,
} from "@domain/readModels/app/Project";
import { User } from "@domain/readModels/app/User";
import { Version } from "@domain/readModels/app/Version";
import { Category } from "@domain/readModels/app/Category";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import { DBProject as DBProject } from "@db/models/app/DBProject";
import sql, { join, raw } from "sql-template-tag";
import { DBInsertUser } from "@db/models/app/DBUser";
import { getEntriesWithDefinedValues } from "@util/objectEntries";
import { DBBadge } from "@db/models/DBBadge";
import {
  getBaseSelectProjectQuery,
  ProjectQueryResponse,
  projectQueryResponseToReadModel,
} from "@db/sqlHelpers/projectQuery";
import {
  convertDatedData,
  extractDatedDataConverted,
  OmitDatedData,
  stripDatedData,
  timestampTZToDate,
} from "@db/sqlHelpers/dbDates";
import { DBVersion } from "@db/models/app/DBVersion";
import {
  DBAppMetadataJSON,
  DBInsertAppMetadataJSON,
} from "@db/models/app/DBAppMetadataJSON";
import { DBCategory } from "@db/models/app/DBCategory";
import {
  assertValidColumKey,
  getInsertKeysAndValuesSql,
} from "@db/sqlHelpers/objectToSQL";

function getUpdateAssigmentsSql(changes: Object) {
  const changeEntries = getEntriesWithDefinedValues(changes);
  if (!changeEntries.length) {
    return;
  }
  return join(
    changeEntries.map(
      ([key, value]) => sql`${raw(assertValidColumKey(key))} = ${value}`
    )
  );
}

export class BadgeHubDataPostgresAdapter implements BadgeHubDataPort {
  private readonly pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  async insertUser(user: DBInsertUser): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(user);
    const insertQuery = sql`insert into users (${keys})
                            values (${values})`;
    await this.pool.query(insertQuery);
  }

  async getCategories(): Promise<Category[]> {
    const dbCategoryNames: OmitDatedData<DBCategory>[] = await this.pool
      .query(sql`select name, slug from categories`)
      .then((res) => res.rows);
    return dbCategoryNames.map((dbCategory) => dbCategory);
  }

  async insertProject(project: DBProject): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(project);
    const insertAppMetadataSql = sql`insert into app_metadata_jsons (name)
                                     values (${project.slug})`;

    await this.pool.query(sql`
        with inserted_app_metadata as (${insertAppMetadataSql} returning id),
             inserted_version as (
                 insert
                     into versions (project_slug, app_metadata_json_id)
                         values (${project.slug}, (select id from inserted_app_metadata)) returning id)
        insert
        into projects (${keys}, version_id)
        values (${values}, (select id from inserted_version))`);
  }

  async updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<ProjectCore, "slug">>
  ): Promise<void> {
    const setters = getUpdateAssigmentsSql(changes);
    if (!setters) {
      return;
    }
    await this.pool.query(sql`update projects
                              set ${setters}
                              where slug = ${projectSlug}`);
  }

  async deleteProject(projectSlug: ProjectSlug): Promise<void> {
    await this.pool.query(sql`update projects
                              set deleted_at = now()
                              where slug = ${projectSlug}`);
  }

  async writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
  ): Promise<void> {
    if (filePath === "metadata.json") {
      const appMetadata: DBAppMetadataJSON = JSON.parse(
        typeof contents === "string"
          ? contents
          : new TextDecoder().decode(contents)
      );
      const setters = getUpdateAssigmentsSql(appMetadata);
      if (!setters) {
        return;
      }

      const appMetadataUpdateQuery = sql`update app_metadata_jsons
                                         set ${setters}
                                         where id = (select app_metadata_json_id
                                                     from versions v
                                                     where v.id =
                                                           (select projects.version_id from projects where slug = ${projectSlug}))`;
      await this.pool.query(appMetadataUpdateQuery);
    } else {
      throw new Error(
        "Method not implemented for files other than the metadata.json file yet."
      );
    }
  }

  updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  writeProjectZip(
    projectSlug: string,
    zipContent: Uint8Array
  ): Promise<Version> {
    throw new Error("Method not implemented.");
  }

  async publishVersion(projectSlug: string): Promise<void> {
    await this.pool.query(
      sql`update versions v
          set published_at=now()
          where (published_at is null and v.id = (select version_id from projects p where slug = ${projectSlug}))`
    );
  }

  async getProject(projectSlug: string): Promise<Project> {
    return (await this.getProjects({ projectSlug }))[0]!;
  }

  // TODO use and test
  async getDraftVersion(projectSlug: string): Promise<Version> {
    const selectVersionIdForProject = sql`select version_id from projects p where p.slug = ${projectSlug}`;
    const dbVersion: DBVersion & { app_metadata: DBAppMetadataJSON } =
      await this.pool
        .query(
          sql`select 
          v.id,
          v.revision,
          v.semantic_version,
          v.zip,
          v.size_of_zip,
          v.git_commit_id,
          v.published_at,
          v.download_count,
          v.project_slug,
          v.app_metadata_json_id,
          v.created_at,
          v.updated_at,
          v.deleted_at,
          to_jsonb(m) as app_metadata
        from versions v
        left join app_metadata_jsons m on v.app_metadata_json_id = m.id
        where v.id = (${selectVersionIdForProject})
        `
        )
        .then((res) => res.rows[0]);
    const { id, ...appMetadataWithoutId } = dbVersion.app_metadata;
    return {
      ...convertDatedData(dbVersion),
      files: [], // TODO
      app_metadata: stripDatedData(appMetadataWithoutId), // TODO
      published_at: timestampTZToDate(dbVersion.published_at),
    };
  }

  getUser(userId: User["id"]): Promise<User> {
    throw new Error("Method not implemented.");
  }

  updateUser(updatedUser: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getFileContents(
    projectSlug: string,
    versionRevision: number | "draft" | "latest",
    filePath: string
  ): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }

  getVersionZipContents(
    projectSlug: string,
    versionRevision: number
  ): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }

  async getBadges(): Promise<Badge[]> {
    const dbBadges: DBBadge[] = await this.pool
      .query(
        sql`select slug, name
            from badges`
      )
      .then((res) => res.rows);
    return dbBadges.map((dbBadge) => ({
      slug: dbBadge.slug,
      name: dbBadge.name,
      ...extractDatedDataConverted(dbBadge),
    }));
  }

  async getProjects(filter?: {
    projectSlug?: Project["slug"];
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: Badge["slug"];
    categorySlug?: Category["slug"];
  }): Promise<Project[]> {
    let query = getBaseSelectProjectQuery();
    if (filter?.badgeSlug) {
      query = sql`${query}
      inner join project_statuses_on_badges psb on p.slug = psb.project_slug and psb.badge_slug = ${filter.badgeSlug}`;
    }
    query = sql`${query} where p.deleted_at is null`;

    if (filter?.categorySlug) {
      query = sql`${query} and c.slug = ${filter.categorySlug}`;
    }

    if (filter?.projectSlug) {
      query = sql`${query} and p.slug = ${filter.projectSlug}`;
    }

    if (filter?.pageLength) {
      query = sql`${query}
      limit
      ${filter.pageLength}
      offset
      ${filter?.pageStart ?? 0}`;
    }

    const projects: ProjectQueryResponse[] = await this.pool
      .query(query)
      .then((res) => res.rows);
    const badgesMap = await this._getBadgesMap(projects.map((p) => p.slug));
    return projects.map(projectQueryResponseToReadModel).map((p) => ({
      ...p,
      badges: badgesMap[p.slug],
    }));
  }

  private async _getBadgesMap(projectSlugs: Project["slug"][]) {
    if (!projectSlugs.length) {
      return {};
    }
    const query = sql`select project_slug, json_agg(badge_slug) as badges from project_statuses_on_badges where project_slug in (${join(projectSlugs)}) group by project_slug`;

    const badges: { project_slug: Project["slug"]; badges: Badge["slug"][] }[] =
      await this.pool.query(query).then((res) => res.rows);

    const badgesMap: Record<Project["slug"], Badge["slug"][]> =
      Object.fromEntries(
        badges.map(({ project_slug, badges }) => [project_slug, badges])
      );
    return badgesMap;
  }
}

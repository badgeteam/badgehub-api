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
import { Entry, getEntriesWithDefinedValues } from "@util/objectEntries";
import { DBBadge } from "@db/models/DBBadge";
import {
  getBaseSelectProjectQuery,
  ProjectQueryResponse,
  projectQueryResponseToReadModel,
} from "@db/sqlHelpers/projectQuery";
import {
  convertDatedData,
  extractDatedDataConverted,
  stripDatedData,
  timestampTZToDate,
} from "@db/sqlHelpers/dbDates";
import { DBVersion } from "@db/models/app/DBVersion";
import {
  DBAppMetadataJSON,
  DBInsertAppMetadataJSON,
} from "@db/models/app/DBAppMetadataJSON";
import { DBCategory } from "@db/models/app/DBCategory";

function getInsertKeysAndValuesSql(user: Object) {
  const definedEntries = getEntriesWithDefinedValues(user);
  const keys = join(definedEntries.map(([key]) => raw(key))); // raw is ok here because these keys are checked against our typescript definitions by tsoa
  const values = join(definedEntries.map(([, value]) => value));
  return { keys, values };
}

function getUpdateAssigmentsSql(
  definedEntries: Entry<Partial<Omit<ProjectCore, "slug">>>[]
) {
  return join(
    definedEntries.map(
      ([
        key,
        value,
      ]) => sql`${raw(key)} // raw is ok here because these keys are checked against our typescript definitions by tsoa
        =
        ${value}`
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
    const dbCategoryNames: Pick<DBCategory, "name">[] = await this.pool
      .query(sql`select name from categories`)
      .then((res) => res.rows);
    return dbCategoryNames.map((dbCategory) => dbCategory.name);
  }

  async insertProject(project: DBProject): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(project);
    const insertAppMetadataSql = sql`insert into app_metadata_jsons (name) values (${project.slug})`;

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
    const definedEntries = getEntriesWithDefinedValues(changes);
    const setters = getUpdateAssigmentsSql(definedEntries);
    if (definedEntries.length !== 0) {
      await this.pool.query(sql`update projects
                                set ${setters}
                                where slug = ${projectSlug}`);
    }
  }

  // TODO test
  async deleteProject(projectSlug: ProjectSlug): Promise<void> {
    await this.pool.query(sql`update projects
                              set deleted_at = now()
                              where slug = ${projectSlug}`);
  }

  writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
  ): Promise<void> {
    throw new Error("Method not implemented.");
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

  // TODO test
  async publishVersion(projectSlug: string): Promise<void> {
    await this.pool.query(
      sql`update versions v
          set published_at=now()
          where (published_at is null and v.id = (select version_id from projects p where slug = ${projectSlug}))`
    );
  }

  // TODO test
  async getProject(projectSlug: string): Promise<Project> {
    const project: ProjectQueryResponse = await this.pool
      .query(sql`${getBaseSelectProjectQuery()} and p.slug = ${projectSlug}`)
      .then((res) => res.rows[0]);
    return projectQueryResponseToReadModel(project);
  }

  // TODO test
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

  getUser(userId: string): Promise<User> {
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
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: string;
    appCategory?: Category["slug"];
  }): Promise<Project[]> {
    let query = getBaseSelectProjectQuery();
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
    return projects.map(projectQueryResponseToReadModel);
  }
}

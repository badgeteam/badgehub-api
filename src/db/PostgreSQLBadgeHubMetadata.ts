import { Badge } from "@domain/readModels/Badge";
import {
  Project,
  ProjectCore,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/app/Project";
import { User } from "@domain/readModels/app/User";
import {
  type LatestVersionAlias,
  RevisionNumberOrAlias,
  Version,
} from "@domain/readModels/app/Version";
import { Category } from "@domain/readModels/app/Category";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import { DBInsertProject } from "@db/models/app/DBProject";
import sql, { join, raw, Sql } from "sql-template-tag";
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
import { BadgeHubMetadata } from "@domain/BadgeHubMetadata";
import { UploadedFile } from "@domain/UploadedFile";
import path from "node:path";
import { DBFileMetadata } from "@db/models/app/DBFileMetadata";
import { FileMetadata } from "@domain/readModels/app/FileMetadata";
import { DBDatedData } from "@db/models/app/DBDatedData";
import { propIsDefinedAndNotNull, WithRequiredProp } from "@util/assertions";
import { TimestampTZ } from "@db/DBTypes";

const ONE_KILO = 1000;

function dbFileToFileMetadata(dbFile: DBFileMetadata): FileMetadata {
  const { version_id, ...dbFileWithoutVersionId } = dbFile;
  return {
    ...convertDatedData(dbFileWithoutVersionId),
    full_path: path.join(dbFile.dir, dbFile.name + dbFile.ext),
    size_formatted: (dbFile.size_of_content / ONE_KILO).toFixed(2) + "KB",
  };
}

function getUpdateAssignmentsSql(changes: Object) {
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

const parsePath = (pathParts: string[]) => {
  const fullPath = path.join(...pathParts);
  const parsedPath = path.parse(fullPath);
  const { dir, name, ext } = parsedPath;
  return { dir, name, ext };
};

const getVersionQuery = (
  projectSlug: ProjectSlug,
  versionRevision: RevisionNumberOrAlias
): Sql => {
  if (typeof versionRevision === "number") {
    return sql`(select id from versions where revision = ${versionRevision} and project_slug = ${projectSlug})`;
  }
  switch (versionRevision) {
    case "draft":
      return sql`(select id from versions where revision = (select draft_revision from projects where slug = ${projectSlug}) and project_slug = ${projectSlug})`;
    case "latest":
      return sql`(select id from versions where revision = (select draft_revision from projects where slug = ${projectSlug}) and project_slug = ${projectSlug})`;
  }
};

export class PostgreSQLBadgeHubMetadata implements BadgeHubMetadata {
  private readonly pool: Pool = getPool();

  constructor() {}

  async getFileMetadata(
    projectSlug: string,
    versionRevision: "draft" | "latest",
    filePath: string
  ): Promise<FileMetadata> {
    const versionQuery = getVersionQuery(projectSlug, versionRevision);
    const { dir, name, ext } = parsePath(filePath.split("/"));
    const {
      rows: [metadata],
    } = await this.pool.query<DBFileMetadata>(sql`select *
                                                      from files
                                                      where version_id = ${versionQuery}
                                                        and dir = ${dir}
                                                        and name = ${name}
                                                        and ext = ${ext}`);
    return dbFileToFileMetadata(metadata!);
  }

  async writeDraftFileMetadata(
    projectSlug: ProjectSlug,
    pathParts: string[],
    uploadedFile: UploadedFile,
    sha256: string,
    mockDates?: DBDatedData
  ): Promise<void> {
    const { dir, name, ext } = parsePath(pathParts);
    const mimetype = uploadedFile.mimetype;
    const size = uploadedFile.size;

    await this.pool.query(
      sql`insert into files (version_id, dir, name, ext, mimetype, size_of_content, sha256)
                values (${getVersionQuery(projectSlug, "draft")}, ${dir}, ${name}, ${ext}, ${mimetype},
                        ${size}, ${sha256})
                on conflict (version_id, dir, name, ext) do update set mimetype=${mimetype},
                                                                       size_of_content=${size},
                                                                       sha256=${sha256},
                                                                       updated_at=now()`
    );
    if (mockDates) {
      await this.pool.query(sql`update files
                                      set created_at = ${mockDates.created_at},
                                          updated_at = ${mockDates.updated_at},
                                          deleted_at = ${mockDates.deleted_at}
                                      where version_id = ${getVersionQuery(projectSlug, "draft")}
                                        and dir = ${dir}
                                        and name = ${name}
                                        and ext = ${ext}`);
    }
  }

  async insertUser(user: DBInsertUser): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(user);
    const insertQuery = sql`insert into users (${keys})
                                values (${values})`;
    await this.pool.query(insertQuery);
  }

  async getCategories(): Promise<Category[]> {
    const dbCategoryNames = await this.pool
      .query<OmitDatedData<DBCategory>>(
        sql`select name, slug
                    from categories`
      )
      .then((res) => res.rows);
    return dbCategoryNames;
  }

  async insertProject(project: DBInsertProject): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(project);
    const createdAt = project.created_at ?? raw("now()");
    const updatedAt = project.updated_at ?? raw("now()");
    const insertAppMetadataSql = sql`insert into app_metadata_jsons (name, created_at, updated_at)
                                         values (${project.slug}, ${createdAt}, ${updatedAt})`;

    await this.pool.query(sql`
            with inserted_app_metadata as (${insertAppMetadataSql} returning id,created_at,updated_at),
                 inserted_version as (
                     insert
                         into versions (project_slug, app_metadata_json_id, created_at, updated_at)
                             values (${project.slug}, (select id from inserted_app_metadata),
                                     (select created_at from inserted_app_metadata),
                                     (select updated_at from inserted_app_metadata)) returning id)
            insert
            into projects (${keys}, draft_revision)
            values (${values}, (select id from inserted_version))`);
  }

  async updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<ProjectCore, "slug">>
  ): Promise<void> {
    const setters = getUpdateAssignmentsSql(changes);
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

  async publishVersion(
    projectSlug: string,
    mockDate?: TimestampTZ
  ): Promise<void> {
    await this.pool.query(sql`
            with published_version as (
                update versions v
                    set published_at = (${mockDate ?? raw("now()")})
                    where v.id = (${getVersionQuery(projectSlug, "draft")})
                    returning id),
                 new_draft_version as (
                     insert into versions (project_slug, app_metadata_json_id, revision)
                         select project_slug, app_metadata_json_id, revision + 1
                         from versions
                         where id = ${getVersionQuery(projectSlug, "draft")}
                         returning id),
                 updated_projects as (
                     update projects
                         set latest_revision = (select id from published_version),
                             draft_revision = (select id from new_draft_version)
                         where slug = ${projectSlug}
                         returning 1),
                 copied_files as (
                     insert into files
                         (version_id, dir, name, ext, mimetype, size_of_content, sha256, created_at, updated_at,
                          deleted_at)
                         select (select id from published_version),
                                dir,
                                name,
                                ext,
                                mimetype,
                                size_of_content,
                                sha256,
                                created_at,
                                updated_at,
                                deleted_at
                         from files
                         where version_id = (select id from new_draft_version)
                         returning 1)
            select 1;
        `);
  }

  async getPublishedProject(
    projectSlug: string,
    versionRevision: LatestVersionAlias
  ): Promise<undefined | Project> {
    const version = await this.getPublishedVersion(
      projectSlug,
      versionRevision
    );
    if (!version) {
      return undefined;
    }
    const projectWithoutVersion = (await this.getProjects({ projectSlug }))[0]!;
    return {
      ...projectWithoutVersion,
      version: version,
    };
  }

  async getDraftProject(projectSlug: string): Promise<Project> {
    const projectWithoutVersion = (await this.getProjects({ projectSlug }))[0]!;
    return {
      ...projectWithoutVersion,
      version: await this.getDraftVersion(projectSlug),
    };
  }

  async getDraftVersion(projectSlug: ProjectSlug): Promise<Version> {
    return this.getVersion(projectSlug, "draft");
  }

  async getPublishedVersion(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<undefined | WithRequiredProp<Version, "published_at">> {
    const version = await this.getVersion(projectSlug, versionRevision);
    if (!propIsDefinedAndNotNull(version, "published_at")) {
      return;
    }
    return version;
  }

  async getVersion(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<Version> {
    const dbVersion: DBVersion & { app_metadata: DBAppMetadataJSON } =
      await this.pool
        .query(
          sql`select v.id,
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
                        where v.id = (${getVersionQuery(projectSlug, versionRevision)})
                    `
        )
        .then((res) => res.rows[0]);
    const { id, ...appMetadataWithoutId } = dbVersion.app_metadata;
    return {
      ...convertDatedData(dbVersion),
      files: await this._getFilesMetadataForVersion(dbVersion.id), // TODO
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
  }): Promise<ProjectWithoutVersion[]> {
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

  async updateDraftMetadata(
    projectSlug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>
  ): Promise<void> {
    const setters = getUpdateAssignmentsSql(appMetadataChanges);
    if (!setters) {
      return;
    }

    const appMetadataUpdateQuery = sql`update app_metadata_jsons
                                           set ${setters}
                                           where id = (select app_metadata_json_id
                                                       from versions v
                                                       where v.id =
                                                             (select projects.draft_revision
                                                              from projects
                                                              where slug = ${projectSlug}))`;
    await this.pool.query(appMetadataUpdateQuery);
  }

  async _getFilesMetadataForVersion(id: DBVersion["id"]) {
    const dbFiles = await this.pool.query(
      sql`select *
                from files
                where version_id = ${id}`
    );
    return dbFiles.rows.map(dbFileToFileMetadata);
  }

  private async _getBadgesMap(projectSlugs: Project["slug"][]) {
    if (!projectSlugs.length) {
      return {};
    }
    const query = sql`select project_slug, json_agg(badge_slug) as badges
                          from project_statuses_on_badges
                          where project_slug in (${join(projectSlugs)})
                          group by project_slug`;

    const badges: { project_slug: Project["slug"]; badges: Badge["slug"][] }[] =
      await this.pool.query(query).then((res) => res.rows);

    const badgesMap: Record<Project["slug"], Badge["slug"][]> =
      Object.fromEntries(
        badges.map(({ project_slug, badges }) => [project_slug, badges])
      );
    return badgesMap;
  }
}

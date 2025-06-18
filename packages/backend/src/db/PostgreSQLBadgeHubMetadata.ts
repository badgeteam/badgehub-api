// noinspection SqlResolve

import { Badge } from "@shared/domain/readModels/Badge";
import {
  Project,
  ProjectCore,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@shared/domain/readModels/project/Project";
import { User } from "@shared/domain/readModels/project/User";
import {
  LatestOrDraftAlias,
  type LatestVersionAlias,
  RevisionNumberOrAlias,
  Version,
} from "@shared/domain/readModels/project/Version";
import { Category } from "@shared/domain/readModels/project/Category";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import { DBInsertProject } from "@shared/dbModels/project/DBProject";
import sql, { join, raw, Sql } from "sql-template-tag";
import { getEntriesWithDefinedValues } from "@shared/util/objectEntries";
import { DBBadge } from "@shared/dbModels/DBBadge";
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
import { DBVersion } from "@shared/dbModels/project/DBVersion";
import {
  APP_METADATA_ROWS,
  DBAppMetadataJSON,
  DBInsertAppMetadataJSON,
} from "@shared/dbModels/project/DBAppMetadataJSON";
import { DBCategory } from "@shared/dbModels/project/DBCategory";
import {
  assertValidColumKey,
  getInsertKeysAndValuesSql,
} from "@db/sqlHelpers/objectToSQL";
import { BadgeHubMetadata } from "@shared/domain/BadgeHubMetadata";
import { UploadedFile } from "@shared/domain/UploadedFile";
import path from "node:path";
import { DBFileMetadata } from "@shared/dbModels/project/DBFileMetadata";
import { FileMetadata } from "@shared/domain/readModels/project/FileMetadata";
import {
  DBDatedData,
  DBSoftDeletable,
} from "@shared/dbModels/project/DBDatedData";
import { TimestampTZ } from "@shared/dbModels/DBTypes";
import { VALID_SLUG_REGEX } from "@shared/contracts/slug";
import { ProjectAlreadyExistsError, UserError } from "@domain/UserError";

const ONE_KILO = 1024;

function dbFileToFileMetadata(dbFile: DBFileMetadata): FileMetadata {
  const { version_id, ...dbFileWithoutVersionId } = dbFile;
  const size_of_content = Number.parseInt(dbFile.size_of_content);
  return {
    ...convertDatedData(dbFileWithoutVersionId),
    size_of_content,
    full_path: path.join(dbFile.dir, dbFile.name + dbFile.ext),
    size_formatted: (size_of_content / ONE_KILO).toFixed(2) + "KB",
  };
}

function getUpdateAssignmentsSql(changes: Object) {
  const changeEntries = getEntriesWithDefinedValues(changes);
  if (!changeEntries.length) {
    return;
  }
  return join(
    changeEntries.map(
      ([key, value]) => sql`${raw(assertValidColumKey(key))} =
      ${value}`
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
    return sql`(select id
                from versions
                where revision = ${versionRevision} and project_slug = ${projectSlug} and published_at is not null)`;
  }
  switch (versionRevision) {
    case "draft":
      return sql`(select id
                  from versions
                  where revision =
                        (select draft_revision from projects where slug = ${projectSlug} and deleted_at is null)
                    and project_slug = ${projectSlug})`;
    case "latest":
      return sql`(select id
                  from versions
                  where revision =
                        (select latest_revision from projects where slug = ${projectSlug} and deleted_at is null)
                    and project_slug = ${projectSlug})`;
  }
};

export class PostgreSQLBadgeHubMetadata implements BadgeHubMetadata {
  private readonly pool: Pool = getPool();

  constructor() {}

  async deleteDraftFile(slug: string, filePath: string): Promise<void> {
    const { dir, name, ext } = parsePath(filePath.split("/"));

    await this.pool.query(sql`update files
                              set deleted_at = now()
                              where version_id = (${getVersionQuery(slug, "draft")})
                                and dir = ${dir}
                                and name = ${name}
                                and ext = ${ext}
                                and deleted_at is null`);
  }

  async getFileMetadata(
    projectSlug: string,
    versionRevision: "draft" | "latest",
    filePath: string
  ): Promise<FileMetadata | undefined> {
    const { dir, name, ext } = parsePath(filePath.split("/"));
    const {
      rows: [metadata],
    } = await this.pool.query<DBFileMetadata>(sql`select *
                                                  from files
                                                  where version_id = ${getVersionQuery(projectSlug, versionRevision)}
                                                    and dir = ${dir}
                                                    and name = ${name}
                                                    and ext = ${ext}
                                                    and deleted_at is null`);
    if (!metadata) {
      return undefined;
    }
    return dbFileToFileMetadata(metadata);
  }

  async writeDraftFileMetadata(
    projectSlug: ProjectSlug,
    pathParts: string[],
    uploadedFile: UploadedFile,
    sha256: string,
    mockDates?: DBDatedData & DBSoftDeletable
  ): Promise<void> {
    const { dir, name, ext } = parsePath(pathParts);
    const mimetype = uploadedFile.mimetype;
    const size = uploadedFile.size;

    await this.pool.query(
      sql`insert into files (version_id, dir, name, ext, mimetype, size_of_content, sha256)
          values (${getVersionQuery(projectSlug, "draft")}, ${dir}, ${name}, ${ext}, ${mimetype},
                  ${size}, ${sha256})
          on conflict (version_id, dir, name, ext) do update set mimetype        = ${mimetype},
                                                                 size_of_content = ${size},
                                                                 sha256          = ${sha256},
                                                                 updated_at      = now(),
                                                                 deleted_at      = null`
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

  async getCategories(): Promise<Category[]> {
    const dbCategoryNames = await this.pool
      .query<OmitDatedData<DBCategory>>(
        sql`select name, slug
            from categories`
      )
      .then((res) => res.rows);
    return dbCategoryNames;
  }

  async insertProject(
    project: Omit<DBInsertProject, keyof DBDatedData>,
    mockDates?: DBDatedData
  ): Promise<void> {
    if (!project.slug.match(VALID_SLUG_REGEX)) {
      throw new UserError(
        `Project slug '${project.slug}' is not valid. It must match the pattern: /^[a-z][a-z_0-9]{2,100}$/`
      );
    }
    const alreadyExistingProject = await this.pool.query(
      sql`select 1 from projects where slug = ${project.slug}`
    );
    if (alreadyExistingProject.rows.length) {
      throw new ProjectAlreadyExistsError(project.slug);
    }
    const createdAt = mockDates?.created_at ?? raw("now()");
    const updatedAt = mockDates?.updated_at ?? raw("now()");
    const { keys, values } = getInsertKeysAndValuesSql({
      ...project,
      created_at: createdAt,
      updated_at: updatedAt,
    });
    const insertAppMetadataSql = sql`insert into app_metadata_jsons (name, created_at, updated_at)
                                     values (${project.slug}, ${createdAt}, ${updatedAt})`;

    await this.pool.query(sql`
      with inserted_app_metadata as (${insertAppMetadataSql} returning id,created_at,updated_at),
           inserted_version as (
             insert
               into versions (project_slug, app_metadata_json_id, created_at, updated_at)
                 values (${project.slug}, (select id from inserted_app_metadata),
                         (select created_at from inserted_app_metadata),
                         (select updated_at from inserted_app_metadata)) returning revision)
      insert
      into projects (${keys}, draft_revision)
      values (${values}, (select revision from inserted_version))`);
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
                              where slug = ${projectSlug}
                                and deleted_at is null`);
  }

  async deleteProject(projectSlug: ProjectSlug): Promise<void> {
    await this.pool.query(sql`update projects
                              set deleted_at = now()
                              where slug = ${projectSlug}
                                and deleted_at is null`);
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
          returning revision, id, app_metadata_json_id),
           copied_app_metadata as (
             insert into app_metadata_jsons (${join(APP_METADATA_ROWS.map(raw))})
               (select ${join(APP_METADATA_ROWS.map(raw))}
                from app_metadata_jsons
                where id = (select app_metadata_json_id from published_version))
               returning id),
           new_draft_version as (
             insert into versions (project_slug, app_metadata_json_id, revision, created_at, updated_at)
               (select project_slug,
                       (select id from copied_app_metadata),
                       revision + 1,
                       (${mockDate ?? raw("now()")}),
                       (${mockDate ?? raw("now()")})
                from versions
                where id = ${getVersionQuery(projectSlug, "draft")})
               returning revision, id),
           updated_projects as (
             update projects
               set latest_revision = (select revision from published_version),
                 draft_revision = (select revision from new_draft_version)
               where slug = ${projectSlug} and deleted_at is null
               returning 1),
           copied_files as (
             insert into files
               (version_id, dir, name, ext, mimetype, size_of_content, sha256, created_at, updated_at,
                deleted_at)
               select (select id from new_draft_version),
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
               where version_id = (select id from published_version)
               returning 1)
      select 1
    `);
  }

  async getProject(
    projectSlug: string,
    versionRevision: LatestVersionAlias
  ): Promise<undefined | Project> {
    const version = await this.getVersion(projectSlug, versionRevision);
    if (!version) {
      return undefined;
    }
    const projectWithoutVersion = (
      await this.getProjects({ projectSlug }, versionRevision)
    )[0]!;
    return {
      ...projectWithoutVersion,
      version: version,
    };
  }

  async getVersion(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<Version | undefined> {
    const dbVersion:
      | undefined
      | (DBVersion & { app_metadata: DBAppMetadataJSON }) = await this.pool
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
                   to_jsonb(m) as app_metadata
            from versions v
                   left join app_metadata_jsons m on v.app_metadata_json_id = m.id
            where v.id = (${getVersionQuery(projectSlug, versionRevision)})
        `
      )
      .then((res) => res.rows[0]);
    if (!dbVersion) {
      return undefined;
    }
    const { id, ...appMetadataWithoutId } = dbVersion.app_metadata;
    return {
      ...convertDatedData(dbVersion),
      files: await this._getFilesMetadataForVersion(dbVersion.id),
      app_metadata: stripDatedData(appMetadataWithoutId),
      published_at: timestampTZToDate(dbVersion.published_at),
    };
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

  async getProjects(
    filter?: {
      projectSlug?: Project["slug"];
      pageStart?: number;
      pageLength?: number;
      badgeSlug?: Badge["slug"];
      categorySlug?: Category["slug"];
      userId?: User["idp_user_id"];
    },
    revision?: LatestOrDraftAlias
  ): Promise<ProjectWithoutVersion[]> {
    let query = getBaseSelectProjectQuery(revision);
    if (filter?.badgeSlug) {
      query = sql`${query}
      inner join project_statuses_on_badges psb on p.slug = psb.project_slug and psb.badge_slug =
      ${filter.badgeSlug}`;
    }
    query = sql`${query} where p.deleted_at is null`;

    if (revision !== "draft") {
      query = sql`${query} and v.published_at is not null`;
    }

    if (filter?.categorySlug) {
      query = sql`${query} and c.slug =
      ${filter.categorySlug}`;
    }

    if (filter?.projectSlug) {
      query = sql`${query} and p.slug =
      ${filter.projectSlug}`;
    }

    if (filter?.userId !== undefined) {
      query = sql`${query} and p.idp_user_id =
      ${filter.userId}`;
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
      badges: badgesMap[p.slug] ?? [],
    }));
  }

  async updateDraftMetadata(
    projectSlug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>,
    mockDates?: DBDatedData
  ): Promise<void> {
    const setters = getUpdateAssignmentsSql({
      ...appMetadataChanges,
      ...mockDates,
    });
    if (!setters) {
      return;
    }

    const appMetadataUpdateQuery = sql`update app_metadata_jsons
                                       set ${setters}
                                       where id = (select app_metadata_json_id
                                                   from versions v
                                                   where v.id = (${getVersionQuery(projectSlug, "draft")}))`;
    const queryResult = await this.pool.query(appMetadataUpdateQuery);
    return queryResult as any;
  }

  async _getFilesMetadataForVersion(id: DBVersion["id"]) {
    const dbFiles = await this.pool.query<DBFileMetadata>(
      sql`select *
          from files
          where version_id = ${id}
            and deleted_at is null`
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

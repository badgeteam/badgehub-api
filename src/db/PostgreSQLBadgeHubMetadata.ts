import { Badge } from "@domain/readModels/Badge";
import {
  Project,
  ProjectCore,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/app/Project";
import { User } from "@domain/readModels/app/User";
import { Version } from "@domain/readModels/app/Version";
import { Category } from "@domain/readModels/app/Category";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import { DBInsertProject } from "@db/models/app/DBProject";
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
import { BadgeHubMetadata } from "@domain/BadgeHubMetadata";
import { UploadedFile } from "@domain/UploadedFile";
import path from "node:path";
import { stringToNumberDigest } from "@util/digests";
import { DBFileMetadata } from "@db/models/app/DBFileMetadata";
import { FileMetadata } from "@domain/readModels/app/FileMetadata";
import { DBDatedData } from "@db/models/app/DBDatedData";

const ONE_KILO = 1000;

async function getLockId(
  projectSlug: ProjectSlug,
  dir: string,
  name: string,
  ext: string
) {
  const inputString = [projectSlug, dir, name, ext].join(",");
  return await stringToNumberDigest(inputString);
}

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

const getDraftVersionIdQuery = (projectSlug: string) => {
  return sql`(select version_id from projects where slug = ${projectSlug})`;
};

const getVersionQuery = (
  versionRevision: number | "draft" | "latest",
  projectSlug: string
) => {
  if (versionRevision !== "draft") {
    // TODO file management: here we should get the file path from the DB in order to fetch the correct file
    throw new Error("getFileMetadata for non-draft version not implemented.");
  }
  return getDraftVersionIdQuery(projectSlug);
};

export class PostgreSQLBadgeHubMetadata implements BadgeHubMetadata {
  private readonly pool: Pool = getPool();

  constructor() {}

  async getFileMetadata(
    projectSlug: string,
    versionRevision: number | "draft" | "latest",
    filePath: string
  ): Promise<FileMetadata> {
    const versionQuery = getVersionQuery(versionRevision, projectSlug);
    const { dir, name, ext } = parsePath(filePath.split("/"));
    const {
      rows: [metadata],
    } = await this.pool.query<DBFileMetadata>(sql`select * from files
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
    dates?: DBDatedData
  ): Promise<void> {
    const { dir, name, ext } = parsePath(pathParts);
    const mimetype = uploadedFile.mimetype;
    const size = uploadedFile.size;

    await this.pool.query(
      sql`insert into files (version_id, dir, name, ext, mimetype, size_of_content, sha256)
                values (${getVersionQuery("draft", projectSlug)}, ${dir}, ${name}, ${ext}, ${mimetype},
                        ${size}, ${sha256}) on conflict (version_id, dir, name, ext) do
            update set mimetype=${mimetype}, size_of_content=${size}, sha256=${sha256}, updated_at=now()`
    );
    if (dates) {
      await this.pool.query(sql`update files
                    set created_at = ${dates.created_at},
                        updated_at = ${dates.updated_at},
                        deleted_at = ${dates.deleted_at}
                    where version_id = ${getVersionQuery("draft", projectSlug)}
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
      .query<OmitDatedData<DBCategory>>(sql`select name, slug from categories`)
      .then((res) => res.rows);
    return dbCategoryNames;
  }

  async insertProject(project: DBInsertProject): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(project);
    const createdAt = project.created_at ?? raw("now()");
    const updatedAt = project.updated_at ?? raw("now()");
    const insertAppMetadataSql = sql`insert into app_metadata_jsons (name,created_at,updated_at)
                                                                        values (${project.slug}, ${createdAt}, ${updatedAt})`;

    await this.pool.query(sql`
            with inserted_app_metadata as (${insertAppMetadataSql} returning id,created_at,updated_at), inserted_version as (
            insert
            into versions (project_slug, app_metadata_json_id, created_at, updated_at)
            values (${project.slug}, (select id from inserted_app_metadata), (select created_at from inserted_app_metadata), (select updated_at from inserted_app_metadata)) returning id)
            insert
            into projects (${keys}, version_id)
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

  async publishVersion(projectSlug: string): Promise<void> {
    await this.pool.query(
      sql`update versions v
                set published_at=now()
                where (published_at is null and v.id = (select version_id from projects p where slug = ${projectSlug}))`
    );
  }

  async getProject(projectSlug: string): Promise<Project> {
    const projectWithoutVersion = (await this.getProjects({ projectSlug }))[0]!;
    return {
      ...projectWithoutVersion,
      version: await this.getDraftVersion(projectSlug),
    };
  }

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
                                                             (select projects.version_id from projects where slug = ${projectSlug}))`;
    await this.pool.query(appMetadataUpdateQuery);
  }

  async _getFilesMetadataForVersion(id: DBVersion["id"]) {
    const dbFiles = await this.pool.query(
      sql`select * from files where version_id = ${id}`
    );
    return dbFiles.rows.map(dbFileToFileMetadata);
  }
}

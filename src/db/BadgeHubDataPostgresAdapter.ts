import { BadgeHubDataPort } from "@domain/BadgeHubDataPort";
import { Badge } from "@domain/readModels/Badge";
import {
  Project,
  ProjectCore,
  ProjectSlug,
} from "@domain/readModels/app/Project";
import { User } from "@domain/readModels/app/User";
import { Version } from "@domain/readModels/app/Version";
import { AppCategoryName } from "@domain/readModels/app/Category";
import { Pool } from "pg";
import { getPool } from "@db/connectionPool";
import { DBProject as DBProject } from "@db/models/app/DBProject";
import { DBVersion as DBVersion } from "@db/models/app/DBVersion";
import sql, { join, raw } from "sql-template-tag";
import { DBAppMetadataJSON as DBMetadataFileContents } from "@db/models/app/DBAppMetadataJSON";
import { DBInsertUser, DBUser } from "@db/models/app/DBUser";
import moment from "moment";
import { getEntriesWithDefinedValues } from "@util/objectEntries";
import { DBBadge } from "@db/models/DBBadge";
import { DBDatedData } from "@db/models/app/DBDatedData";
import { DatedData } from "@domain/readModels/app/DatedData";

function getInsertKeysAndValuesSql(user: Object) {
  const definedEntries = getEntriesWithDefinedValues(user);
  const keys = join(definedEntries.map(([key]) => raw(key))); // raw is ok here because these keys are checked against our typescript definitions by tsoa
  const values = join(definedEntries.map(([, value]) => value));
  return { keys, values };
}

function dateStringsToDates(dbDatedData: DBDatedData): DatedData {
  const datedData: DatedData = {
    created_at: moment(dbDatedData.created_at).toDate(),
    updated_at: moment(dbDatedData.updated_at).toDate(),
  };
  if (dbDatedData.deleted_at) {
    datedData.deleted_at = moment(dbDatedData.deleted_at).toDate();
  }
  return datedData;
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

  getCategories(): Promise<AppCategoryName[]> {
    throw new Error("Method not implemented.");
  }

  async insertProject(project: DBProject): Promise<void> {
    const { keys, values } = getInsertKeysAndValuesSql(project);
    let sql2 = sql`insert into projects (${keys})
                   values (${values})`;
    await this.pool.query(sql2.text, sql2.values);
  }

  async updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<ProjectCore, "slug">>
  ): Promise<void> {
    const definedEntries = getEntriesWithDefinedValues(changes);
    const setters = join(
      definedEntries.map(
        ([
          key,
          value,
        ]) => sql`${raw(key)} // raw is ok here because these keys are checked against our typescript definitions by tsoa
        =
        ${value}`
      )
    );
    if (definedEntries.length !== 0) {
      await this.pool.query(sql`update projects
                                set ${setters}
                                where slug = ${projectSlug}`);
    }
  }

  async deleteProject(projectSlug: ProjectSlug): Promise<void> {
    await this.pool.query(sql`delete
                              from projects
                              where slug = ${projectSlug}`);
  }

  writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
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
    const dbBadges: DBBadge[] = await this.pool
      .query(
        sql`select slug, name
            from badges`
      )
      .then((res) => res.rows);
    return dbBadges.map((dbBadge) => ({
      slug: dbBadge.slug,
      name: dbBadge.name,
      ...dateStringsToDates(dbBadge),
    }));
  }

  async getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: string;
    appCategory?: AppCategoryName;
  }): Promise<Project[]> {
    let query = sql`select p.slug,
                           p.git,
                           p.allow_team_fixes,
                           p.user_id,
                           p.created_at,
                           p.updated_at,
                           p.deleted_at,
                           v.semantic_version,
                           v.git_commit_id,
                           v.published_at,
                           v.revision,
                           v.size_of_zip,
                           m.description,
                           m.interpreter,
                           m.license_file,
                           m.name,
                           u.name as author_name
                    from projects p
                             left join users u on p.user_id = u.id
                             left join versions v on p.version_id = v.id
                             left join app_metadata_jsons m on v.app_metadata_json_id = m.id
                    where p.deleted_at is null
                      and u.deleted_at is null
                      and v.deleted_at is null
    `;
    if (filter?.pageLength) {
      query = sql`${query}
      limit
      ${filter.pageLength}
      offset
      ${filter?.pageStart ?? 0}`;
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
        user_id: dbProject.user_id,
        author: dbProject.author_name, // todo maybe change to email, full id or object with multiple fields
        badges: [], // TODO
        category: dbProject.category || "Uncategorised",
        collaborators: [], // TODO
        description: dbProject.description,
        download_counter: undefined, // TODO
        git: dbProject.git,
        git_commit_id: dbProject.git_commit_id,
        interpreter: dbProject.interpreter,
        license: dbProject.license_file, // TODO check what we should do with the license, possibly we could say that this is either a path or 'MIT'|..., but then still we should read out the licens somewhere if it is a file.
        name: dbProject.name,
        published_at: moment(dbProject.published_at).toDate(),
        revision: dbProject.revision,
        size_of_content: undefined, // TODO
        size_of_zip: dbProject.size_of_zip,
        slug: dbProject.slug,
        states: undefined,
        status: undefined, // TODO
        versions: undefined, // TODO
        dependencies: undefined, // TODO
        votes: undefined, // TODO
        warnings: undefined, // TODO
        ...dateStringsToDates(dbProject),
      };
    });
  }
}

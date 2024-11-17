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
import sql, { join, raw } from "sql-template-tag";
import { DBInsertUser } from "@db/models/app/DBUser";
import { getEntriesWithDefinedValues } from "@util/objectEntries";
import { DBBadge } from "@db/models/DBBadge";
import {
  getBaseSelectProjectQuery,
  ProjectQueryResponse,
  projectQueryResponseToReadModel,
} from "@db/sqlHelpers/projectQuery";
import { dateStringsToDates } from "@db/sqlHelpers/datedData";

function getInsertKeysAndValuesSql(user: Object) {
  const definedEntries = getEntriesWithDefinedValues(user);
  const keys = join(definedEntries.map(([key]) => raw(key))); // raw is ok here because these keys are checked against our typescript definitions by tsoa
  const values = join(definedEntries.map(([, value]) => value));
  return { keys, values };
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

  // TODO test
  async deleteProject(projectSlug: ProjectSlug): Promise<void> {
    await this.pool.query(sql`update projects set deleted_at = now()
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

  async getProject(projectSlug: string): Promise<Project> {
    const project: ProjectQueryResponse = await this.pool
      .query(sql`${getBaseSelectProjectQuery()} and p.slug = ${projectSlug}`)
      .then((res) => res.rows[0]);
    return projectQueryResponseToReadModel(project);
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

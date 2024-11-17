import { Project, ProjectSlug } from "@domain/readModels/app/Project";
import { Version } from "@domain/readModels/app/Version";
import { User } from "@domain/readModels/app/User";
import { FileMetadata } from "@domain/readModels/app/FileMetadata";
import { Badge } from "@domain/readModels/Badge";
import { AppCategoryName } from "@domain/readModels/app/Category";
import { DBInsertUser } from "@db/models/app/DBUser";
import { DBInsertProject, DBProject } from "@db/models/app/DBProject";

export interface BadgeHubDataPort {
  insertUser(user: DBInsertUser): Promise<void>;

  insertProject(project: DBInsertProject): Promise<void>;

  updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<DBProject, "slug">>
  ): Promise<void>;

  deleteProject(projectSlug: ProjectSlug): Promise<void>;

  writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
  ): Promise<void>;

  writeProjectZip(
    projectSlug: string,
    zipContent: Uint8Array
  ): Promise<Version>;

  publishVersion(projectSlug: ProjectSlug): Promise<void>; // Publishes the current state of the app as a version

  getProject(projectSlug: ProjectSlug): Promise<Project>;

  getVersion(projectSlug: ProjectSlug): Promise<Version>;

  getUser(userEmail: User["email"]): Promise<User>;

  updateUser(updatedUser: User): Promise<void>;

  getFileDownloadLink(
    projectSlug: Project["slug"],
    versionRevision: number,
    filePath: FileMetadata["name"]
  ): Promise<string>;

  getVersionDownloadLink(
    projectSlug: Project["slug"],
    versionRevision: number
  ): Promise<string>;

  getBadges(): Promise<Badge[]>;

  getCategories(): Promise<AppCategoryName[]>;

  getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: Badge["slug"];
    appCategory?: AppCategoryName;
  }): Promise<Project[]>;
}

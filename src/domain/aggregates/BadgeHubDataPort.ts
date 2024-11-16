import { Project, ProjectCore, ProjectSlug } from "@domain/models/app/Project";
import { Version } from "@domain/models/app/Version";
import { User } from "@domain/models/app/User";
import { FileMetadata } from "@domain/models/app/FileMetadata";
import { MetadataFileContents } from "@domain/models/app/MetadataFileContents";
import { Badge } from "@domain/models/Badge";
import { AppCategoryName } from "@domain/models/app/Category";

export interface BadgeHubDataPort {
  insertProject(project: ProjectCore): Promise<void>;
  updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<ProjectCore, "slug">>
  ): Promise<void>;

  deleteProject(projectSlug: ProjectSlug): Promise<void>;

  writeFile(
    projectSlug: ProjectSlug,
    filePath: string,
    contents: string | Uint8Array
  ): Promise<void>;

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

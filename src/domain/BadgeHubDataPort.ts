import type { Project, ProjectSlug } from "@domain/readModels/app/Project";
import type { Version } from "@domain/readModels/app/Version";
import type { User } from "@domain/readModels/app/User";
import type { FileMetadata } from "@domain/readModels/app/FileMetadata";
import type { Badge } from "@domain/readModels/Badge";
import type { Category } from "@domain/readModels/app/Category";
import type { DBInsertUser } from "@db/models/app/DBUser";
import type { DBInsertProject, DBProject } from "@db/models/app/DBProject";
import type { DBInsertAppMetadataJSON } from "@db/models/app/DBAppMetadataJSON";

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

  getDraftVersion(projectSlug: ProjectSlug): Promise<Version>;

  getUser(userId: User["id"]): Promise<User>;

  updateUser(updatedUser: User): Promise<void>;

  getFileContents(
    projectSlug: Project["slug"],
    versionRevision: number | "draft" | "latest",
    filePath: FileMetadata["name"]
  ): Promise<Uint8Array>;

  getVersionZipContents(
    projectSlug: Project["slug"],
    versionRevision: number | "draft" | "latest"
  ): Promise<Uint8Array>;

  getBadges(): Promise<Badge[]>;

  getCategories(): Promise<Category[]>;

  getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: Badge["slug"];
    categorySlug?: Category["slug"];
  }): Promise<Project[]>;

  updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>
  ): Promise<void>;
}

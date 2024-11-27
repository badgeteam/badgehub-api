import { Project, ProjectSlug } from "@domain/readModels/app/Project";
import { Version } from "@domain/readModels/app/Version";
import { User } from "@domain/readModels/app/User";
import { FileMetadata } from "@domain/readModels/app/FileMetadata";
import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/app/Category";

export interface BadgeHubDataPort {
  getProject(projectSlug: ProjectSlug): Promise<Project>;

  getDraftVersion(projectSlug: ProjectSlug): Promise<Version>;

  getUser(userId: User["id"]): Promise<User>;

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
}

import {
  Project,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/app/Project";
import { Version } from "@domain/readModels/app/Version";
import { User } from "@domain/readModels/app/User";
import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/app/Category";
import { DBInsertUser } from "@db/models/app/DBUser";
import { DBInsertProject, DBProject } from "@db/models/app/DBProject";
import { DBInsertAppMetadataJSON } from "@db/models/app/DBAppMetadataJSON";
import { UploadedFile } from "@domain/UploadedFile";

export interface BadgeHubMetadata {
  insertUser(user: DBInsertUser): Promise<void>;

  insertProject(project: DBInsertProject): Promise<void>;

  updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<DBProject, "slug">>
  ): Promise<void>;

  deleteProject(projectSlug: ProjectSlug): Promise<void>;

  publishVersion(projectSlug: ProjectSlug): Promise<void>; // Publishes the current state of the app as a version

  getProject(projectSlug: ProjectSlug): Promise<Project>;

  getDraftVersion(projectSlug: ProjectSlug): Promise<Version>;

  getUser(userId: User["id"]): Promise<User>;

  updateUser(updatedUser: User): Promise<void>;

  getBadges(): Promise<Badge[]>;

  getCategories(): Promise<Category[]>;

  getProjects(filter?: {
    pageStart?: number;
    pageLength?: number;
    badgeSlug?: Badge["slug"];
    categorySlug?: Category["slug"];
  }): Promise<ProjectWithoutVersion[]>;

  updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>
  ): Promise<void>;

  prepareWriteDraftFile(
    projectSlug: ProjectSlug,
    pathParts: string[],
    uploadedFile: UploadedFile
  ): Promise<void>;

  confirmWriteDraftFile(
    projectSlug: ProjectSlug,
    pathParts: string[]
  ): Promise<void>;
}

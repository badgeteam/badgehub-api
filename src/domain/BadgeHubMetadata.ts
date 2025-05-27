import {
  Project,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@domain/readModels/project/Project";
import {
  LatestOrDraftAlias,
  RevisionNumberOrAlias,
  Version,
} from "@domain/readModels/project/Version";
import { User } from "@domain/readModels/project/User";
import { Badge } from "@domain/readModels/Badge";
import { Category } from "@domain/readModels/project/Category";
import { DBInsertProject, DBProject } from "@db/models/project/DBProject";
import { DBInsertAppMetadataJSON } from "@db/models/project/DBAppMetadataJSON";
import { UploadedFile } from "@domain/UploadedFile";
import { DBDatedData } from "@db/models/project/DBDatedData";
import { FileMetadata } from "@domain/readModels/project/FileMetadata";
import { TimestampTZ } from "@db/DBTypes";

export interface BadgeHubMetadata {
  insertProject(
    project: DBInsertProject,
    mockDates?: DBDatedData
  ): Promise<void>;

  updateProject(
    projectSlug: ProjectSlug,
    changes: Partial<Omit<DBProject, "slug">>
  ): Promise<void>;

  deleteProject(projectSlug: ProjectSlug): Promise<void>;

  publishVersion(
    projectSlug: ProjectSlug,
    mockDate?: TimestampTZ
  ): Promise<void>; // Publishes the current state of the project as a version

  getProject(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<undefined | Project>;

  getVersion(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<undefined | Version>;

  getBadges(): Promise<Badge[]>;

  getCategories(): Promise<Category[]>;

  getProjects(
    filter?: {
      pageStart?: number;
      pageLength?: number;
      badgeSlug?: Badge["slug"];
      categorySlug?: Category["slug"];
      user?: User["idp_user_id"];
    },
    version?: LatestOrDraftAlias
  ): Promise<ProjectWithoutVersion[]>;

  updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<DBInsertAppMetadataJSON>,
    mockDates?: DBDatedData
  ): Promise<void>;

  writeDraftFileMetadata(
    projectSlug: ProjectSlug,
    pathParts: string[],
    uploadedFile: UploadedFile,
    sha256: string,
    mockDates?: DBDatedData
  ): Promise<void>;

  getFileMetadata(
    projectSlug: string,
    versionRevision: RevisionNumberOrAlias,
    filePath: string
  ): Promise<FileMetadata | undefined>;

  deleteDraftFile(slug: string, filePath: string): Promise<void>;
}

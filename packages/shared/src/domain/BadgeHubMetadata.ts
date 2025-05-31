import {
  Project,
  ProjectSlug,
  ProjectWithoutVersion,
} from "@shared/domain/readModels/project/Project";
import {
  LatestOrDraftAlias,
  RevisionNumberOrAlias,
  Version,
} from "@shared/domain/readModels/project/Version";
import { User } from "@shared/domain/readModels/project/User";
import { Badge } from "@shared/domain/readModels/Badge";
import { Category } from "@shared/domain/readModels/project/Category";
import { DBInsertProject, DBProject } from "@shared/dbModels/project/DBProject";
import { DBInsertAppMetadataJSON } from "@shared/dbModels/project/DBAppMetadataJSON";
import { UploadedFile } from "@shared/domain/UploadedFile";
import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import { FileMetadata } from "@shared/domain/readModels/project/FileMetadata";
import { TimestampTZ } from "@shared/dbModels/DBTypes";

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

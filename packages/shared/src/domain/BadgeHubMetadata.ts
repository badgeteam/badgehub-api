import {
  ProjectDetails,
  ProjectSlug,
  ProjectSummary,
} from "@shared/domain/readModels/project/ProjectDetails";
import {
  LatestOrDraftAlias,
  RevisionNumberOrAlias,
  Version,
} from "@shared/domain/readModels/project/Version";
import { User } from "@shared/domain/readModels/project/User";
import { DBInsertProject, DBProject } from "@shared/dbModels/project/DBProject";
import { UploadedFile } from "@shared/domain/UploadedFile";
import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import { FileMetadata } from "@shared/domain/readModels/project/FileMetadata";
import { TimestampTZ } from "@shared/dbModels/DBTypes";
import { BadgeSlug } from "@shared/domain/readModels/Badge";
import { CategoryName } from "@shared/domain/readModels/project/Category";
import { WriteAppMetadataJSON } from "@shared/domain/writeModels/AppMetadataJSON";

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
  ): Promise<undefined | ProjectDetails>;

  getVersion(
    projectSlug: ProjectSlug,
    versionRevision: RevisionNumberOrAlias
  ): Promise<undefined | Version>;

  getBadges(): Promise<BadgeSlug[]>;

  getCategories(): Promise<CategoryName[]>;

  getProjectSummaries(
    filter?: {
      pageStart?: number;
      pageLength?: number;
      badge?: BadgeSlug;
      category?: CategoryName;
      user?: User["idp_user_id"];
    },
    version?: LatestOrDraftAlias
  ): Promise<ProjectSummary[]>;

  updateDraftMetadata(
    slug: string,
    appMetadataChanges: Partial<WriteAppMetadataJSON>,
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

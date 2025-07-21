import { AppMetadataJSON, appMetadataJSONSchema } from "./AppMetadataJSON";
import { DatedData, datedDataSchema } from "./DatedData";
import { FileMetadata, fileMetadataSchema } from "./FileMetadata";
import { ProjectDetails } from "@shared/domain/readModels/project/ProjectDetails";
import { z } from "zod/v3";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";

export type LatestVersionAlias = "latest";
type DraftVersionAlias = "draft";
export type LatestOrDraftAlias = LatestVersionAlias | DraftVersionAlias;
export type RevisionNumber = number;
export type RevisionNumberOrAlias = LatestOrDraftAlias | RevisionNumber;

export interface VersionRelation {
  version: Version;
}

export interface Version {
  revision: RevisionNumber;
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string; // Allow spefifying a git commit ID for the version, if it exists // TODO allow updating this somehow
  files: Array<FileMetadata>;
  app_metadata: AppMetadataJSON; // Changed! New property that has the content of the metadata.json file that is installed on the project.
  published_at?: Date;
  download_count: number;
  project_slug: ProjectDetails["slug"];
}

export const versionSchema = z.object({
  revision: z.number(),
  zip: z.string().optional(),
  size_of_zip: z.number().optional(),
  git_commit_id: z.string().optional(),
  files: z.array(fileMetadataSchema),
  app_metadata: appMetadataJSONSchema,
  published_at: z.date().optional(),
  download_count: z.number(),
  project_slug: z.string(), // Project slug
});

__tsCheckSame<Version, Version, z.infer<typeof versionSchema>>(true);

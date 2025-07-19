import { AppMetadataJSON, readAppMetadataJSONSchema } from "./AppMetadataJSON";
import { DatedData, datedDataSchema } from "./DatedData";
import { FileMetadata, fileMetadataSchema } from "./FileMetadata";
import { Project } from "@shared/domain/readModels/project/Project";
import { z } from "zod/v4";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export type LatestVersionAlias = "latest";
type DraftVersionAlias = "draft";
export type LatestOrDraftAlias = LatestVersionAlias | DraftVersionAlias;
export type RevisionNumber = number;
export type RevisionNumberOrAlias = LatestOrDraftAlias | RevisionNumber;

export interface VersionRelation {
  version: Version;
}

export interface Version extends DatedData {
  revision: RevisionNumber;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  files: Array<FileMetadata>;
  app_metadata: AppMetadataJSON; // Changed! New property that has the content of the metadata.json file that is installed on the project.
  published_at?: Date;
  download_count: number;
  project_slug: Project["slug"];
}

export const versionSchema = datedDataSchema.extend({
  revision: z.number(),
  semantic_version: z.string().optional(),
  zip: z.string().optional(),
  size_of_zip: z.number().optional(),
  git_commit_id: z.string().optional(),
  files: z.array(fileMetadataSchema),
  app_metadata: readAppMetadataJSONSchema,
  published_at: z.date().optional(),
  download_count: z.number(),
  project_slug: z.string(), // Project slug
});

type Checks = [CheckSame<Version, Version, z.infer<typeof versionSchema>>];

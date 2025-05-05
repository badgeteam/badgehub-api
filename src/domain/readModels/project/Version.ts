import { AppMetadataJSON } from "./AppMetadataJSON";
import { DatedData } from "./DatedData";
import { FileMetadata } from "./FileMetadata";
import { Project } from "@domain/readModels/project/Project";

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

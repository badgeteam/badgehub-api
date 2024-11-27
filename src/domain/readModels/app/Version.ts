import { AppMetadataJSON } from "./AppMetadataJSON";
import { DatedData } from "./DatedData";
import { FileMetadata } from "./FileMetadata";
import { Project } from "@domain/readModels/app/Project";

export interface VersionRelation {
  version: Version;
}

export interface Version extends DatedData {
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  files: Array<FileMetadata>;
  app_metadata: AppMetadataJSON; // Changed! New property that has the content of the metadata.json file that is installed on the app.
  published_at?: Date;
  download_count: number;
  project_slug: Project["slug"];
}

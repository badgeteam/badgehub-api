import { AppMetadataJSON } from "./AppMetadataJSON";
import { DatedData } from "./DatedData";
import { UserRelation } from "./User";
import { FileMetadata } from "./FileMetadata";

export interface VersionRelation {
  version: Version;
}

export interface Version extends UserRelation, DatedData {
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  files: Array<FileMetadata>;
  app_metadata: AppMetadataJSON; // Changed! New property that has the content of the metadata.json file that is installed on the app.
  published_at: Date;
  download_count: number;
}

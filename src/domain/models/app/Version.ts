import { AppMetadata } from "./MetadataFileContents";
import { DatedData } from "./DatedData";
import { ProjectRelation } from "./Project";
import { UserRelation } from "./User";
import { FileMetadata } from "./FileMetadata";

export interface VersionRelation {
  version_id: number;
  version: Version;
}

export interface Version extends UserRelation, ProjectRelation, DatedData {
  id: number;
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  files: Array<FileMetadata>;
  files_count?: number;
  app_metadata: AppMetadata; // Changed! New property that has the content of the metadata.json file that is installed on the app.
  published: boolean;
}

import { MetadataFileContents } from "./MetadataFileContents";
import { DatedData } from "./DatedData";
import { UserRelation } from "./User";

export interface VersionRelation {
  version_id: Version["id"];
}

export interface Version extends UserRelation, DatedData {
  id: number;
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  app_metadata: MetadataFileContents; // Changed! New property that has the content of the metadata.json file that is installed on the app.
  published: boolean;
  download_count: number;
}

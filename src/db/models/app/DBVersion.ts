import { MetadataFileContentsRelation } from "./DBMetadataFileContents";
import { DBDatedData } from "./DBDatedData";
import { UserRelation } from "./DBUser";
import { TimestampTZ } from "@db/DBTypes";

export interface VersionRelation {
  version_id: DBVersion["id"];
}

export interface DBVersion
  extends UserRelation,
    DBDatedData,
    MetadataFileContentsRelation {
  id: number;
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  published_at: TimestampTZ;
  download_count: number;
}

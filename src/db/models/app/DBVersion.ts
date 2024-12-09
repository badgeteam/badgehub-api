import { AppMetadataJSONRelation } from "./DBAppMetadataJSON";
import { DBDatedData } from "./DBDatedData";
import { TimestampTZ } from "@db/DBTypes";
import { ProjectSlugRelation } from "@db/models/app/DBProject";

export interface VersionRelation {
  version_id: DBVersion["id"];
}
export interface DBInsertVersion
  extends AppMetadataJSONRelation,
    ProjectSlugRelation {
  id: number;
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  published_at?: TimestampTZ;
  download_count?: number;
}

export interface DBVersion extends DBInsertVersion, DBDatedData {
  download_count: number;
}

import { AppMetadataJSONRelation } from "./DBAppMetadataJSON";
import { DBDatedData } from "./DBDatedData";
import { UserEmailRelation } from "./DBUser";
import { TimestampTZ } from "@db/DBTypes";
import { ProjectSlugRelation } from "@db/models/app/DBProject";

export interface VersionRelation {
  version_id: DBVersion["id"];
}

export interface DBVersion
  extends UserEmailRelation,
    DBDatedData,
    ProjectSlugRelation,
    AppMetadataJSONRelation {
  id: number;
  revision: number;
  semantic_version?: string; // Changed! Semantic version
  zip?: string;
  size_of_zip?: number;
  git_commit_id?: string;
  published_at?: TimestampTZ;
  download_count: number;
}

import { AppMetadataJSONRelation } from "./DBAppMetadataJSON";
import { DBDatedData } from "./DBDatedData";
import { TimestampTZ } from "@db/DBTypes";
import { ProjectSlugRelation } from "@db/models/app/DBProject";

export type VersionRelation<
  K extends string = "version_id",
  VC extends keyof DBInsertVersion = "id",
> = Record<K, DBInsertVersion[VC]>;

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

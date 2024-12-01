import type { VersionRelation } from "../DBVersion";
import type { FileMetadataRelation } from "@db/models/app/DBFileMetadata";

// TODO implement table
export interface VersionHasFiles extends VersionRelation, FileMetadataRelation {
  id: number;
}

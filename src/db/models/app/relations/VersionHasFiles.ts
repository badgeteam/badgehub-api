import { VersionRelation } from "../DBVersion";
import { FileMetadataRelation } from "@db/models/app/DBFileMetadata";

// TODO implement table
export interface VersionHasFiles extends VersionRelation, FileMetadataRelation {
  id: number;
}

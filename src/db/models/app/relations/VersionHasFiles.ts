import { VersionRelation } from "../DBVersion";
import { FileMetadataRelation } from "@db/models/app/DBFileMetadata";

export interface VersionHasFiles extends VersionRelation, FileMetadataRelation {
  id: number;
}

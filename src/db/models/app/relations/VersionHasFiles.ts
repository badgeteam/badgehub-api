import { VersionRelation } from "../Version";
import { FileMetadataRelation } from "@db/models/app/FileMetadata";

export interface VersionHasFiles extends VersionRelation, FileMetadataRelation {
  id: number;
}

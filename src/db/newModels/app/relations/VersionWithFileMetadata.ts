import { VersionRelation } from "../Version";
import { FileMetadataRelation } from "@db/newModels/app/FileMetadata";

export interface VersionWithFileMetadata
  extends VersionRelation,
    FileMetadataRelation {
  id: number;
}

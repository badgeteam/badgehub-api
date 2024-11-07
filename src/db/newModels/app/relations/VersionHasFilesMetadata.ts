import { VersionRelation } from "../Version";
import { FileMetadataRelation } from "@db/newModels/app/FileMetadata";

export interface VersionHasFilesMetadata
  extends VersionRelation,
    FileMetadataRelation {
  id: number;
}

import { VersionRelation } from "../Version";
import { FileMetadataRelation } from "@db/newModels/app/FileMetadata";

export interface VersionHasFiles extends VersionRelation, FileMetadataRelation {
  id: number;
}

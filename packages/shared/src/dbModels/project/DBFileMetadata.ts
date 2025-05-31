import { DBDatedData } from "./DBDatedData";
import { VersionRelation } from "@shared/dbModels/project/DBVersion";
import { DBFileData } from "@shared/dbModels/project/DBFileData";

// table name: files
export interface DBFileMetadata extends VersionRelation, DBDatedData {
  id: number;
  dir: string; // directory of the file in the project, empty string if top level
  name: string; // file name without extension
  ext: string; // file name without extension
  mimetype: string; // Can include info about the programming language
  size_of_content: string;
  sha256: DBFileData["sha256"]; // lowercase hex sha256 digest, allows verifying whether content is the same as other file.
}

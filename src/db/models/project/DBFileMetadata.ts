import { DBDatedData } from "./DBDatedData";
import { VersionRelation } from "@db/models/project/DBVersion";
import { DBFileData } from "@db/models/project/DBFileData";

// table name: files
export interface DBFileMetadata extends VersionRelation, DBDatedData {
  id: number;
  dir: string; // directory of the file in the project, empty string if top level
  name: string; // file name without extension
  ext: string; // file name without extension
  mimetype: string; // Can include info about the programming language
  size_of_content: number;
  sha256: DBFileData["sha256"]; // lowercase hex sha256 digest, allows verifying whether content is the same as other file.
}

import { DBDatedData } from "./DBDatedData";
import { VersionRelation } from "@db/models/app/DBVersion";
import { DBFileData } from "@db/models/app/DBFileData";

// table name: files
export interface DBFileMetadata
  extends VersionRelation<"version_id">,
    DBDatedData {
  id: number;
  extension: string;
  dir: string; // directory of the file in the project, empty string if top level
  name: string; // file name without extension
  ext: string; // file name without extension
  mimetype: string; // Can include info about the programming language
  size_of_content: number;
  sha256: DBFileData["sha256"]; // lowercase hex sha256 digest, allows verifying whether content is the same as other file.
}

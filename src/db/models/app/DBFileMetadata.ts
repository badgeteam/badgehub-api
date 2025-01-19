import { UserRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";
import { VersionRelation } from "@db/models/app/DBVersion";

// table name: file_metadata
export interface DBFileMetadata extends VersionRelation, DBDatedData {
  id: number;
  extension: string;
  dir: string; // directory of the file in the project, empty string if top level
  name: string; // file name without extension
  ext: string; // file name without extension
  mimetype: string; // Can include info about the programming language
  size_of_content: number;
  sha256: string; // lowercase hex sha256 digest, allows verifying whether content is the same as other file.
  confirmed_in_sync_on_disk: boolean;
}

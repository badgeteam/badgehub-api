import type { UserRelation } from "./DBUser";
import type { DBDatedData } from "./DBDatedData";

export interface FileMetadataRelation {
  file_metadata_id: DBFileMetadata["id"];
}

// table name: file_metadata
export interface DBFileMetadata extends UserRelation, DBDatedData {
  id: number;
  lintable?: boolean; // Some files in a project can be auto-lintable, others not
  extension: string;
  baseName: string;
  editable?: boolean;
  file_content_language?: string; // Eg. python, c++
  mime?: string;
  size_of_content: number;
  crc32: string;
}

import { VersionRelation } from "./Version";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface FileMetadataRelation {
  file_metadata_id: FileMetadata["id"];
}

export interface FileMetadata extends VersionRelation, UserRelation, DatedData {
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

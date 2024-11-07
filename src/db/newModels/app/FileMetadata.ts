import { VersionRelation } from "./Version";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface FileMetadata extends VersionRelation, UserRelation, DatedData {
  id: number;
  lintable?: boolean; // Some files in a project can be auto-lintable, others not
  extension: string;
  baseName: string;
  editabe?: boolean;
  programming_language?: string;
  mime?: string;
  size_of_content: number;
  crc32: string;
}

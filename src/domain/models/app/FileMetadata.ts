import { VersionRelation } from "./Version";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface FileMetadata extends VersionRelation, UserRelation, DatedData {
  editable?: boolean;
  lintable?: boolean;
  extension: string;
  baseName: string;
  mime?: string; // Can include info about the programming language
  size_of_content: number;
  crc32: string;

  // Computed
  size_formatted: string;
  name: string;
}

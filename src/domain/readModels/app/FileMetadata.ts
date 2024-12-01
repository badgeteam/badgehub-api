import type { VersionRelation } from "./Version";
import type { UserRelation } from "./User";
import type { DatedData } from "./DatedData";

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

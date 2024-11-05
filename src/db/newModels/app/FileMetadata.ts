import { VersionRelation } from "./Version";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface FileMetadata extends VersionRelation, UserRelation, DatedData {
  id: number;
  content?: string | Uint8Array;
  editable: boolean;
  lintable: boolean;
  processable: boolean;
  extension: string;
  baseName: string;
  mime: string;
  size_of_content: number;
  size_formatted: string;
  viewable?: string;
  crc32: string;
}

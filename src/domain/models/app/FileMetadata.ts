import { VersionRelation } from "./Version";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface FileMetadata extends VersionRelation, UserRelation, DatedData {
  id: number;
  name: string;
  editable: boolean;
  lintable: boolean;
  extension: string;
  baseName: string;
  mime: string;
  size_of_content: number;
  size_formatted: string;
  crc32: string;
}

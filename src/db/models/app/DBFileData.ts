import { DBDatedData } from "@db/models/app/DBDatedData";

export interface DBFileData extends DBDatedData {
  id: number;
  sha256: string;
  content: Uint8Array;
  size_formatted: string;
  size_of_content: number;
}

import { DBDatedData } from "@shared/dbModels/project/DBDatedData";

export interface DBFileData extends DBDatedData {
  id: number;
  sha256: string;
  content: Uint8Array;
}

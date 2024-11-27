import { TimestampTZ } from "@db/DBTypes";

export interface DBDatedData {
  created_at: TimestampTZ; // Creation date
  updated_at: TimestampTZ; // Last update date
  deleted_at?: TimestampTZ; // Optional Deletion date
}

import { TimestampTZ } from "@shared/dbModels/DBTypes";

export interface DBDatedData {
  created_at: TimestampTZ; // Creation date
  updated_at: TimestampTZ; // Last update date
}

export interface DBSoftDeletable {
  deleted_at?: TimestampTZ; // Deletion date
}

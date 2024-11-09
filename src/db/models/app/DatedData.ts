export interface DatedData {
  created_at: Date; // Creation date
  updated_at: Date; // Last update date
  deleted_at?: Date; // Optional Deletion date
}

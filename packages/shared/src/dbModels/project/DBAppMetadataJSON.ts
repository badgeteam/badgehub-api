// This represents the contents of the metadata.json file that we have in the project.
// This is only put into the database for making interesting read queries possible.
// These contents should never be updated directly, but instead the metadata.json file should be modified and then read out again in order to fill the fields here.
// Metadata for a published version cannot be edited, except by republishing this version which would overwrite the old version.

import { AppMetadataJSON } from "@shared/domain/readModels/project/AppMetadataJSON";
import { DBDatedData } from "@shared/dbModels/project/DBDatedData";

type CopyableAppMetadata = Omit<Required<DBAppMetadataJSON>, "id">;

// Helper object so that we can have a type-safe way to create an array of all columns of the project app_metadata_json
// The caveat here is that this is given that we have correctly specified DBAppMetadataJSON to match the app_metadata_json table
const allAppMetadataRowsAsKeysObject: CopyableAppMetadata = {
  author: undefined as never,
  category: undefined as never,
  description: undefined as never,
  file_mappings: undefined as never,
  file_mappings_overrides: undefined as never,
  icon: undefined as never,
  interpreter: undefined as never,
  is_hidden: undefined as never,
  is_library: undefined as never,
  license_file: undefined as never,
  main_executable: undefined as never,
  main_executable_overrides: undefined as never,
  name: undefined as never,
  semantic_version: undefined as never,
  created_at: undefined as never,
  updated_at: undefined as never,
} as const;

export const APP_METADATA_ROWS = Object.keys(
  allAppMetadataRowsAsKeysObject
) as (keyof CopyableAppMetadata)[];

export interface AppMetadataJSONRelation {
  app_metadata_json_id: DBAppMetadataJSON["id"];
}

// table name: app_metadata_json
export interface DBInsertAppMetadataJSON extends AppMetadataJSON {}

export interface DBAppMetadataJSON
  extends DBDatedData,
    DBInsertAppMetadataJSON {
  id: number;
}

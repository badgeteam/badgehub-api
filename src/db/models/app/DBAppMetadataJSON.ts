// This represents the contents of the metadata.json file that we have in the app.
// This is only put into the database for making interesting read queries possible.
// These contents should never be updated directly, but instead the metadata.json file should be modified and then read out again in order to fill the fields here.
// Metadata for a published version cannot be edited, except by republishing this version which would overwrite the old version.

import { AppMetadataJSON } from "@domain/readModels/app/AppMetadataJSON";
import { DBDatedData } from "@db/models/app/DBDatedData";

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

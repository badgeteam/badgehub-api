// This represents the contents of the metadata.json file that we have in the app.
// This is only put into the database for making interesting read queries possible.
// These contents should never be updated directly, but instead the metadata.json file should be modified and then read out again in order to fill the fields here.
// Metadata for a published version cannot be edited, except by republishing this version which would overwrite the old version.
import { MetadataFileContents as DBMetadataFileContents } from "@db/newModels/app/MetadataFileContents";

export interface MetadataFileContents extends DBMetadataFileContents {}

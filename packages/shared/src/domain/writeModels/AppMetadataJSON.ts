import {
  AppMetadataJSON,
  appMetadataJSONSchema,
} from "@shared/domain/readModels/project/AppMetadataJSON";

export type WriteAppMetadataJSON = AppMetadataJSON;
export const writeAppMetadataJSONSchema = appMetadataJSONSchema;

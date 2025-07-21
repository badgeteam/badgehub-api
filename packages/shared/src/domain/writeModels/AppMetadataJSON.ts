import {
  AppMetadataJSON,
  readAppMetadataJSONSchema,
} from "@shared/domain/readModels/project/AppMetadataJSON";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";
import { DBInsertAppMetadataJSON } from "@shared/dbModels/project/DBAppMetadataJSON";
import { z } from "zod/v4";

export type WriteAppMetadataJSON = AppMetadataJSON;
export const writeAppMetadataJSONSchema = readAppMetadataJSONSchema;

__tsCheckSame<
  WriteAppMetadataJSON,
  WriteAppMetadataJSON,
  DBInsertAppMetadataJSON
>(true);

__tsCheckSame<
  WriteAppMetadataJSON,
  WriteAppMetadataJSON,
  z.infer<typeof writeAppMetadataJSONSchema>
>(true);

import {
  AppMetadataJSON,
  readAppMetadataJSONSchema,
} from "@domain/readModels/project/AppMetadataJSON";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";
import { DBInsertAppMetadataJSON } from "@db/models/project/DBAppMetadataJSON";
import { z } from "zod/v3";

export type WriteAppMetadataJSON = AppMetadataJSON;
export const writeAppMetadataJSONSchema = readAppMetadataJSONSchema;

type checks = [
  CheckSame<
    WriteAppMetadataJSON,
    WriteAppMetadataJSON,
    DBInsertAppMetadataJSON
  >,
  CheckSame<
    WriteAppMetadataJSON,
    WriteAppMetadataJSON,
    z.infer<typeof writeAppMetadataJSONSchema>
  >,
];

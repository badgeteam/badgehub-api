// This represents the contents of the metadata.json file that we have in the project.
// This is only put into the database for making interesting read queries possible.
// These contents should never be updated directly, but instead the metadata.json file should be modified and then read out again in order to fill the fields here.
// Metadata for a published version cannot be edited, except by republishing this version which would overwrite the old version.
import {
  CategoryName,
  categoryNameSchema,
} from "@shared/domain/readModels/project/Category";
import { Badge } from "@shared/domain/readModels/Badge";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";
import { z } from "zod/v4";

export interface AppMetadataJSON {
  name?: string;
  description?: string;
  category?: CategoryName;
  author?: string; // The name of the user_name
  icon?: string; // The relative icon path
  license_file?: string; // Optional path of the license file for this project. If not set, then LICENSE.md will be used.
  is_library?: boolean; // Whether this project can be used as a library by other apps
  is_hidden?: boolean; // Whether this project should be shown in the launcher or not. Only useful for libraries.
  semantic_version?: string; // Changed! [Semantic version](https://semver.org/) of the project, the semantic versioning is mostly relevant if the project is a library. Authors who don't use this semantic versioning will get a 0.x version with x just an number like we previously had the revision number.
  interpreter?: string; // Changed! For example 'python' or the project slug of a 3rd party dependency of this project.
  main_executable?: string; // Relative path of the executable file from this package that is the main executable file of this project.
  main_executable_overrides?: Record<Badge["slug"], string>; // Optional field to allow overriding the main_executable for a certain badge.
  file_mappings?: Array<{ source: string; destination: string }>; // Changed! Mapping to tell the badge where some files in this project should be placed on the filesystem. Source is a relative path. Desitination can either be relative or absolute.
  file_mappings_overrides?: Record<
    Badge["slug"],
    Array<{ source: string; destination: string }>
  >; // Changed! optional field to allow overriding or adding a file mapping for a device name slug (key).
}

export const readAppMetadataJSONSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: categoryNameSchema.optional(),
  author: z.string().optional(),
  icon: z.string().optional(),
  license_file: z.string().optional(),
  is_library: z.boolean().optional(),
  is_hidden: z.boolean().optional(),
  semantic_version: z.string().optional(),
  interpreter: z.string().optional(),
  main_executable: z.string().optional(),
  main_executable_overrides: z.record(z.string(), z.string()).optional(),
  file_mappings: z
    .array(
      z.object({
        source: z.string(),
        destination: z.string(),
      })
    )
    .optional(),
  file_mappings_overrides: z
    .record(
      z.array(
        z.object({
          source: z.string(),
          destination: z.string(),
        })
      )
    )
    .optional(),
});

type Checks = [
  CheckSame<
    AppMetadataJSON,
    AppMetadataJSON,
    z.infer<typeof readAppMetadataJSONSchema>
  >,
];

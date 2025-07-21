import { z } from "zod/v4";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";

export const variantJSONSchema = z.object({
  type: z
    .string()
    .optional()
    .describe(
      "the type of the application variant, eg 'standalone', 'badge_vms', 'appfs', 'micropython', 'circuitpython', ..."
    ), // Only useful for projects with project_type "application".
  executable: z
    .string()
    .optional()
    .describe(
      `Path to the source_file path of the file that should be executed to launch an app.
If the executable property is not present, then it can be guessed by the badge firmware (eg. case of only one file with correct extension, or case of __init__.py file in micropython app.`
    ),
  assets: z
    .array(
      z.object({
        source_file: z
          .string()
          .describe("Path to the source file, relative to the project root"),
        destination_file: z
          .string()
          .optional()
          .describe("Path to the destination file in the badge's filesystem"),
      })
    )
    .optional()
    .describe(`List of assets that are part of the variant, with optionally an indication of how the files should be mapped on the badge. 
if the assets property is not present, then all project files should be considered part of the variant.`),
});

type AssetEntry = {
  source_file: string;
  destination_file?: string;
};

export type VariantJSON = {
  type?: string;
  executable?: string;
  assets?: AssetEntry[];
};

__tsCheckSame<VariantJSON, VariantJSON, z.infer<typeof variantJSONSchema>>(true)
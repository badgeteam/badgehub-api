import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";
import { z } from "zod/v3";

export interface DatedData {
  created_at: Date; // Creation date
  updated_at: Date; // Last update date
}

export const datedDataSchema = z.object({
  created_at: z.date(),
  updated_at: z.date(),
});

__tsCheckSame<DatedData, DatedData, z.infer<typeof datedDataSchema>>(true);

import {
  DatedData,
  datedDataSchema,
} from "@domain/readModels/project/DatedData";
import { z } from "zod/v3";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface BadgeRelation {
  badge: Badge;
}

export interface Badge extends DatedData {
  name: string;
  slug: string;
}

export const badgeSchema = datedDataSchema.extend({
  name: z.string(),
  slug: z.string(),
});

type Checks = [CheckSame<Badge, Badge, z.infer<typeof badgeSchema>>];

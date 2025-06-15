import {
  DatedData,
  datedDataSchema,
} from "@shared/domain/readModels/project/DatedData";
import { z } from "zod/v3";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export const BADGE_MAP = {
  mch2022: "mch2022",
  troopers23: "troopers23",
  why2025: "WHY2025",
};

export type BadgeMap = typeof BADGE_MAP;

export const BADGE_SLUGS = Object.keys(BADGE_MAP) as Array<keyof BadgeMap>;
export type BadgeSlug = keyof BadgeMap;
export type BadgeName = BadgeMap[BadgeSlug];
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

export const badgeSlugSchema = z.enum([
  "mch2022",
  "troopers23",
  "why2025",
] as const satisfies BadgeSlug[]);

type Checks = [CheckSame<Badge, Badge, z.infer<typeof badgeSchema>>];

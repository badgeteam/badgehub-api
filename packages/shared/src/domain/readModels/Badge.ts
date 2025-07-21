import { z } from "zod/v4";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";
import { getSharedConfig } from "@shared/config/sharedConfig";

export type BadgeSlug = string;

export const badgeSlugSchema = z
  .string()
  // .regex(/^a-z[a-z0-9_]*$/) // TODO check
  .describe("badge slug");

export function getBadgeSlugs(): BadgeSlug[] {
  return Object.keys(getSharedConfig()!.badges);
}

__tsCheckSame<BadgeSlug, BadgeSlug, z.infer<typeof badgeSlugSchema>>(true);

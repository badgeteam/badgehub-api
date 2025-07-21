import { Version, versionSchema } from "./Version";
import { User } from "./User";
import { DatedData, datedDataSchema } from "./DatedData";
import { BadgeSlug } from "../Badge";
import {
  CategoryName,
  categoryNameSchema,
} from "@shared/domain/readModels/project/Category";
import { z } from "zod/v3";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";
import {
  IconMap,
  iconMapSchema,
} from "@shared/domain/readModels/project/AppMetadataJSON";

export type ProjectStatusName =
  | "working"
  | "in_progress"
  | "broken"
  | "unknown";

export const projectStatusNameSchema = z.enum([
  "working",
  "in_progress",
  "broken",
  "unknown",
]);

export interface ProjectCore {
  slug: string;
  idp_user_id: User["idp_user_id"];
  git?: string; // Git URL of the project, if it exists
}

export interface ProjectSummary extends ProjectCore {
  // Computed
  name: string;
  published_at?: Date; // Can be undefined if not published yet
  icon_map?: IconMap; // Relative path to the icon of the project
  // download_counter?: number; // Sum of all version download count|null
  // ratings: { average: number; count: number } | null; // Average rating and count of ratings
  license_type?: string; // Eg. MIT
  categories?: CategoryName[];
  badges?: Array<BadgeSlug>;
  description?: string; // description in metadata of latest version of the projectct
  revision: number; // latest revision number of the project
}

export interface ProjectDetails extends ProjectCore, DatedData {
  version: Version;
  // states?: Array<ProjectStatusOnBadge>;|null
  // votes?: Array<VoteFromUser>;|null
  // warnings?: Array<WarningFromUser>;|null
  // collaborators?: Array<User>;|null
}

export type ProjectSlug = ProjectDetails["slug"];

export const projectCoreSchema = z.object({
  slug: z.string(),
  idp_user_id: z.string(),
  git: z.string().optional(),
});

export const detailedProjectSchema = projectCoreSchema
  .extend({ version: versionSchema })
  .extend(datedDataSchema.shape);

export const projectSummarySchema = projectCoreSchema.extend({
  name: z.string(),
  published_at: z.date().optional(),
  icon_map: iconMapSchema.optional(),
  license_type: z.string().optional(),
  categories: z.array(categoryNameSchema).optional(),
  badges: z.array(z.string()).optional(), // Array of BadgeSlugs
  description: z.string().optional(),
  revision: z.number(),
});

__tsCheckSame<
  ProjectDetails,
  ProjectDetails,
  z.infer<typeof detailedProjectSchema>
>(true);

__tsCheckSame<
  ProjectSummary,
  ProjectSummary,
  z.infer<typeof projectSummarySchema>
>(true);

__tsCheckSame<
  ProjectStatusName,
  ProjectStatusName,
  z.infer<typeof projectStatusNameSchema>
>(true);

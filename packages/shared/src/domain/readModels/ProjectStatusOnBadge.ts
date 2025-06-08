import {
  DatedData,
  datedDataSchema,
} from "@shared/domain/readModels/project/DatedData";
import { BadgeRelation, badgeSchema } from "./Badge";
import {
  ProjectStatusName,
  projectStatusNameSchema,
} from "@shared/domain/readModels/project/Project";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";
import { z } from "zod/v3";

export interface ProjectStatusOnBadge extends BadgeRelation, DatedData {
  status: ProjectStatusName; // Status for this project for this particular badge
}

export const projectStatusOnBadgeSchema = datedDataSchema.extend({
  status: projectStatusNameSchema,
  badge: badgeSchema,
});

type Checks = [
  CheckSame<
    ProjectStatusOnBadge,
    ProjectStatusOnBadge,
    z.infer<typeof projectStatusOnBadgeSchema>
  >,
];

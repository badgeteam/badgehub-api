import type { DatedData } from "@domain/readModels/app/DatedData";
import type { BadgeRelation } from "./Badge";
import type { ProjectStatusName } from "@domain/readModels/app/Project";

export interface ProjectStatusOnBadge extends BadgeRelation, DatedData {
  status: ProjectStatusName; // Status for this project for this particular badge
}

import { DatedData } from "@domain/readModels/app/DatedData";
import { BadgeRelation } from "./Badge";
import { ProjectStatusName } from "@domain/readModels/app/Project";

export interface ProjectStatusOnBadge extends BadgeRelation, DatedData {
  status: ProjectStatusName; // Status for this project for this particular badge
}

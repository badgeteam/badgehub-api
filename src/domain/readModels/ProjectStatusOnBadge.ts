import { DatedData } from "@domain/readModels/project/DatedData";
import { BadgeRelation } from "./Badge";
import { ProjectStatusName } from "@domain/readModels/project/Project";

export interface ProjectStatusOnBadge extends BadgeRelation, DatedData {
  status: ProjectStatusName; // Status for this project for this particular badge
}

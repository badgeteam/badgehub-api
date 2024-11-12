import { DatedData } from "@domain/models/app/DatedData";
import { BadgeRelation } from "./Badge";
import { ProjectStatusName } from "@domain/models/app/Project";

export interface ProjectStatusOnBadge extends BadgeRelation, DatedData {
  status: ProjectStatusName; // Status for this project for this particular badge
}

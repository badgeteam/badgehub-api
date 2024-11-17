import { DBDatedData } from "./app/DBDatedData";
import { BadgeSlugRelation } from "./DBBadge";
import { ProjectStatusName } from "@domain/readModels/app/Project";

export interface ProjectStatusOnBadgeRelation {
  project_status_on_badge_id: DBProjectStatusOnBadge["id"];
}
export interface DBProjectStatusOnBadge extends DBDatedData, BadgeSlugRelation {
  id: number;
  status: ProjectStatusName; // Status for this project for this particular badge
}

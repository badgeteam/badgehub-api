import { DatedData } from "./app/DatedData";
import { BadgeRelation } from "./Badge";
export interface ProjectStatusOnBadgeRelation {
  project_status_on_badge_id: ProjectStatusOnBadge["id"];
}
export interface ProjectStatusOnBadge extends DatedData, BadgeRelation {
  id: number;
  status: ProjectStatusName; // Status for this project for this particular badge
}

export type ProjectStatusName =
  | "working"
  | "in_progress"
  | "broken"
  | "unknown";

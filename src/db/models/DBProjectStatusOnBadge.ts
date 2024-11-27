import { DBDatedData } from "./app/DBDatedData";
import { BadgeSlugRelation } from "./DBBadge";
import { ProjectStatusName } from "@domain/readModels/app/Project";
import { ProjectSlugRelation } from "@db/models/app/DBProject";

// table name: project_statuses_on_badges
export interface DBProjectStatusOnBadge
  extends DBDatedData,
    BadgeSlugRelation,
    ProjectSlugRelation {
  id: number;
  status: ProjectStatusName; // Status for this project for this particular badge
}

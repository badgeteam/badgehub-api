import type { DBDatedData } from "./app/DBDatedData";
import type { BadgeSlugRelation } from "./DBBadge";
import type { ProjectStatusName } from "@domain/readModels/app/Project";
import type { ProjectSlugRelation } from "@db/models/app/DBProject";

export interface DBInsertProjectStatusOnBadge
  extends BadgeSlugRelation,
    ProjectSlugRelation {
  status?: ProjectStatusName; // Status for this project for this particular badge
}

// table name: project_statuses_on_badges
export interface DBProjectStatusOnBadge
  extends DBInsertProjectStatusOnBadge,
    DBDatedData {
  id: number;
}

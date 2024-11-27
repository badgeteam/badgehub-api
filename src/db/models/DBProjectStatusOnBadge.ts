import { DBDatedData } from "./app/DBDatedData";
import { BadgeSlugRelation } from "./DBBadge";
import { ProjectStatusName } from "@domain/readModels/app/Project";
import { ProjectSlugRelation } from "@db/models/app/DBProject";

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

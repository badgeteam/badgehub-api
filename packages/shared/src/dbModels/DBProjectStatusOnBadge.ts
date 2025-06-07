import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import { BadgeSlugRelation } from "./DBBadge";
import { ProjectStatusName } from "@shared/domain/readModels/project/Project";
import { ProjectSlugRelation } from "@shared/dbModels/project/DBProject";

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

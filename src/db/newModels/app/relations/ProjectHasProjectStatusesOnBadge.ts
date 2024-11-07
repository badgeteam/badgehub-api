import { UserRelation } from "../User";
import { ProjectRelation } from "../Project";
import { ProjectStatusOnBadgeRelation } from "@db/newModels/ProjectStatusOnBadge";

export interface ProjectHasProjectStatusesOnBadge
  extends ProjectRelation,
    ProjectStatusOnBadgeRelation {
  id: number;
}

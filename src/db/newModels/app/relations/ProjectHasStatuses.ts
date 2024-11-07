import { UserRelation } from "../User";
import { ProjectRelation } from "../Project";
import { ProjectStatusOnBadgeRelation } from "@db/newModels/ProjectStatusOnBadge";

export interface ProjectHasStatuses
  extends ProjectRelation,
    ProjectStatusOnBadgeRelation {
  id: number;
}

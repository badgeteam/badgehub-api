import { ProjectRelation } from "../Project";
import { ProjectStatusOnBadgeRelation } from "@db/models/ProjectStatusOnBadge";

export interface ProjectHasStatuses
  extends ProjectRelation,
    ProjectStatusOnBadgeRelation {
  id: number;
}

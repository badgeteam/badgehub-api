import { ProjectRelation } from "../DBProject";
import { ProjectStatusOnBadgeRelation } from "@db/models/DBProjectStatusOnBadge";

export interface ProjectHasStatuses
  extends ProjectRelation,
    ProjectStatusOnBadgeRelation {
  id: number;
}

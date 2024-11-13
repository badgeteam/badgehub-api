import { ProjectSlugRelation } from "../DBProject";
import { ProjectStatusOnBadgeRelation } from "@db/models/DBProjectStatusOnBadge";

export interface ProjectHasStatuses
  extends ProjectSlugRelation,
    ProjectStatusOnBadgeRelation {
  id: number;
}

import { ProjectSlugRelation } from "../DBProject";
import { ProjectStatusOnBadgeRelation } from "@db/models/DBProjectStatusOnBadge";

// TODO implement table
export interface ProjectHasStatuses
  extends ProjectSlugRelation,
    ProjectStatusOnBadgeRelation {
  id: number;
}

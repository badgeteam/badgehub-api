import type { UserRelation } from "../DBUser";
import type { ProjectSlugRelation } from "../DBProject";

// TODO implement table
export interface ProjectHasCollaborators
  extends ProjectSlugRelation,
    UserRelation {
  id: number;
}

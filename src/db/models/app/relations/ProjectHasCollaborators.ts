import { UserRelation } from "../DBUser";
import { ProjectSlugRelation } from "../DBProject";

// TODO implement table
export interface ProjectHasCollaborators
  extends ProjectSlugRelation,
    UserRelation {
  id: number;
}

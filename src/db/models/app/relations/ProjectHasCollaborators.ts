import { UserRelation } from "../DBUser";
import { ProjectSlugRelation } from "../DBProject";

export interface ProjectHasCollaborators
  extends ProjectSlugRelation,
    UserRelation {
  id: number;
}

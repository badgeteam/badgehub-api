import { UserEmailRelation } from "../DBUser";
import { ProjectSlugRelation } from "../DBProject";

export interface ProjectHasCollaborators
  extends ProjectSlugRelation,
    UserEmailRelation {
  id: number;
}

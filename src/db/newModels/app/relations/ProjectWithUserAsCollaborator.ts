import { UserRelation } from "../User";
import { ProjectRelation } from "../Project";

export interface ProjectWithUserAsCollaborator
  extends ProjectRelation,
    UserRelation {
  id: number;
}

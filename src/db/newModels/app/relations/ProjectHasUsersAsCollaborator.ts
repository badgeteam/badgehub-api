import { UserRelation } from "../User";
import { ProjectRelation } from "../Project";

export interface ProjectHasUsersAsCollaborator
  extends ProjectRelation,
    UserRelation {
  id: number;
}

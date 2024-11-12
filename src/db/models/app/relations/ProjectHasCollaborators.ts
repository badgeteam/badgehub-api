import { UserRelation } from "../DBUser";
import { ProjectRelation } from "../DBProject";

export interface ProjectHasCollaborators extends ProjectRelation, UserRelation {
  id: number;
}

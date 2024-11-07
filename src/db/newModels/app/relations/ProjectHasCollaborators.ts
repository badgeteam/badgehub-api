import { UserRelation } from "../User";
import { ProjectRelation } from "../Project";

export interface ProjectHasCollaborators extends ProjectRelation, UserRelation {
  id: number;
}

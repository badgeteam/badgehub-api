import { VersionRelation } from "../DBVersion";
import { ProjectRelation } from "../DBProject";

export interface ProjectHasVersions extends VersionRelation, ProjectRelation {
  id: number;
}

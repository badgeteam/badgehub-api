import { VersionRelation } from "../Version";
import { ProjectRelation } from "../Project";

export interface ProjectHasVersions extends VersionRelation, ProjectRelation {
  id: number;
}

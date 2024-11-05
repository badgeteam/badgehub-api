import { VersionRelation } from "../Version";
import { ProjectRelation } from "../Project";

export interface ProjectWithVersion extends VersionRelation, ProjectRelation {
  id: number;
}

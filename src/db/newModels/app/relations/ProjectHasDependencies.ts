import { ProjectRelation } from "../Project";
import { VersionedDependencyRelation } from "../VersionedDependency";

export interface ProjectHasDependencies
  extends ProjectRelation,
    VersionedDependencyRelation {
  id: number;
}

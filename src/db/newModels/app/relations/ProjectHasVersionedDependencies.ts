import { ProjectRelation } from "../Project";
import { VersionedDependencyRelation } from "../VersionedDependency";

export interface ProjectHasVersionedDependencies
  extends ProjectRelation,
    VersionedDependencyRelation {
  id: number;
}

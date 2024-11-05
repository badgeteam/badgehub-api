import { ProjectRelation } from "../Project";
import { VersionedDependencyRelation } from "../VersionedDependency";

export interface ProjectWithVersionedDependency
  extends ProjectRelation,
    VersionedDependencyRelation {
  id: number;
}

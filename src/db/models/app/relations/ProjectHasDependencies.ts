import { ProjectRelation } from "../DBProject";
import { VersionedDependencyRelation } from "../DBVersionedDependency";

export interface ProjectHasDependencies
  extends ProjectRelation,
    VersionedDependencyRelation {
  id: number;
}

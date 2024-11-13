import { ProjectSlugRelation } from "../DBProject";
import { VersionedDependencyRelation } from "../DBVersionedDependency";

export interface ProjectHasDependencies
  extends ProjectSlugRelation,
    VersionedDependencyRelation {
  id: number;
}

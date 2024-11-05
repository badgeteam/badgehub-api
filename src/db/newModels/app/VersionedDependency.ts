import { ProjectRelation } from "./Project";
import { SemanticVersionRangeRelation } from "./SemanticVersionRange";

type VersionedDependencyId = number;

export interface VersionedDependencyRelation {
  versioned_dependency_id: VersionedDependencyId;
}

export interface VersionedDependency
  extends ProjectRelation,
    SemanticVersionRangeRelation {
  id: VersionedDependencyId;
}

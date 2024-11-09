import { ProjectSlugRelation } from "./Project";
import { SemanticVersionRangeRelation } from "./SemanticVersionRange";

type VersionedDependencyId = number;

export interface VersionedDependencyRelation {
  versioned_dependency_id: VersionedDependency["id"];
}

export interface VersionedDependency
  extends ProjectSlugRelation,
    SemanticVersionRangeRelation {
  id: VersionedDependencyId;
}

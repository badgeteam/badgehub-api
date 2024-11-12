import { ProjectSlugRelation } from "./DBProject";
import { SemanticVersionRangeRelation } from "./DBSemanticVersionRange";

type VersionedDependencyId = number;

export interface VersionedDependencyRelation {
  versioned_dependency_id: DBVersionedDependency["id"];
}

export interface DBVersionedDependency
  extends ProjectSlugRelation,
    SemanticVersionRangeRelation {
  id: VersionedDependencyId;
}

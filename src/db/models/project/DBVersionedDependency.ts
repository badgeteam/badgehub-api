import { ProjectSlugRelation } from "./DBProject";

type VersionedDependencyId = number;

export interface VersionedDependencyRelation {
  versioned_dependency_id: DBVersionedDependency["id"];
}

// table versioned_dependencies
export interface DBVersionedDependency extends ProjectSlugRelation {
  semantic_version_range: string;
  project_slug: string;
  depends_on_project_slug: string;
  id: VersionedDependencyId;
}

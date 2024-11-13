import { VersionRelation } from "../DBVersion";
import { ProjectSlugRelation } from "../DBProject";

export interface ProjectHasVersions
  extends VersionRelation,
    ProjectSlugRelation {
  id: number;
}

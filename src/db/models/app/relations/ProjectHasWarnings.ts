import type { ProjectSlugRelation } from "../DBProject";
import type { WarningRelation } from "../DBWarning";
import type { WarningFromUserRelation } from "../DBWarningFromUser";

// TODO implement table
export interface ProjectHasWarnings
  extends WarningFromUserRelation,
    ProjectSlugRelation,
    WarningRelation {
  id: number;
}

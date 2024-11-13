import { ProjectSlugRelation } from "../DBProject";
import { WarningRelation } from "../DBWarning";
import { WarningFromUserRelation } from "../DBWarningFromUser";

export interface ProjectHasWarnings
  extends WarningFromUserRelation,
    ProjectSlugRelation,
    WarningRelation {
  id: number;
}

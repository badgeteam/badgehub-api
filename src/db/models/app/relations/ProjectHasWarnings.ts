import { ProjectRelation } from "../DBProject";
import { WarningRelation } from "../DBWarning";
import { WarningFromUserRelation } from "../DBWarningFromUser";

export interface ProjectHasWarnings
  extends WarningFromUserRelation,
    ProjectRelation,
    WarningRelation {
  id: number;
}

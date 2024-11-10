import { ProjectRelation } from "../Project";
import { WarningRelation } from "../Warning";
import { WarningFromUserRelation } from "../WarningFromUser";

export interface ProjectHasWarnings
  extends WarningFromUserRelation,
    ProjectRelation,
    WarningRelation {
  id: number;
}

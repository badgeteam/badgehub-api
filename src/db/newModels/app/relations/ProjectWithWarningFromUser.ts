import { ProjectRelation } from "../Project";
import { DatedData } from "../DatedData";
import { UserRelation } from "../User";
import { WarningRelation } from "../Warning";
import { WarningFromUserRelation } from "../WarningFromUser";

export interface ProjectWithWarningFromUser
  extends WarningFromUserRelation,
    ProjectRelation,
    WarningRelation {
  id: number;
}

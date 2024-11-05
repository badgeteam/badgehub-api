import { WarningRelation } from "./Warning";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
export interface WarningFromUserRelation {
  warning_from_user_id: number;
}

export interface WarningFromUser
  extends WarningRelation,
    UserRelation,
    DatedData {
  id: number;
}

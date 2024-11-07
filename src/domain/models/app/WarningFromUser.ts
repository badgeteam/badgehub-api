import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Warning } from "@db/newModels/app/Warning";

export interface WarningFromUserRelation {
  warning_from_user_id: WarningFromUser["id"];
}

export interface WarningFromUser extends Warning, UserRelation, DatedData {
  id: number;
}

import { WarningRelation } from "./DBWarning";
import { UserRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";

export interface WarningFromUserRelation {
  warning_from_user_id: DBWarningFromUser["id"];
}

export interface DBWarningFromUser
  extends WarningRelation,
    UserRelation,
    DBDatedData {
  id: number;
}

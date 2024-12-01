import type { WarningRelation } from "./DBWarning";
import type { UserRelation } from "./DBUser";
import type { DBDatedData } from "./DBDatedData";

export interface WarningFromUserRelation {
  warning_from_user_id: DBWarningFromUser["id"];
}

export interface DBWarningFromUser
  extends WarningRelation,
    UserRelation,
    DBDatedData {
  id: number;
}

import { WarningRelation } from "./DBWarning";
import { UserEmailRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";

export interface WarningFromUserRelation {
  warning_from_user_id: DBWarningFromUser["id"];
}

export interface DBWarningFromUser
  extends WarningRelation,
    UserEmailRelation,
    DBDatedData {
  id: number;
}

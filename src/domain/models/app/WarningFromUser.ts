import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Warning } from "@db/newModels/app/Warning";

export interface WarningFromUser
  extends Exclude<Warning, "id">,
    UserRelation,
    DatedData {}

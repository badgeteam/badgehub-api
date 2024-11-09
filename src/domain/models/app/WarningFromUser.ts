import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Warning } from "@db/models/app/Warning";

export interface WarningFromUser
  extends Exclude<Warning, "id">,
    UserRelation,
    DatedData {}

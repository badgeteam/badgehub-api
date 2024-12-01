import type { UserRelation } from "./User";
import type { DatedData } from "./DatedData";

export interface Warning {
  description: string;
}

export interface WarningFromUser extends Warning, UserRelation, DatedData {}

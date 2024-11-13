import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface Warning {
  description: string;
}

export interface WarningFromUser extends Warning, UserRelation, DatedData {}

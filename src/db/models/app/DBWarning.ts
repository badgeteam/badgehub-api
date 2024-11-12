import { Warning } from "@domain/models/app/WarningFromUser";

export interface WarningRelation {
  warning_id: DBWarning["id"];
}

export interface DBWarning extends Warning {
  id: number;
}

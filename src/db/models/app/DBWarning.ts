import type { Warning } from "@domain/readModels/app/WarningFromUser";

export interface WarningRelation {
  warning_id: DBWarning["id"];
}

export interface DBWarning extends Warning {
  id: number;
}

import { Warning } from "@domain/readModels/project/WarningFromUser";

export interface WarningRelation {
  warning_id: DBWarning["id"];
}

export interface DBWarning extends Warning {
  id: number;
}

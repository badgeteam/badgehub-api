export interface WarningRelation {
  warning_id: Warning["id"];
}

export interface Warning {
  id: number;
  description: string;
}

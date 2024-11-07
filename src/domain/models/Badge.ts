import { DatedData } from "@domain/models/app/DatedData";

export interface Badge extends DatedData {
  id: number;
  name: string;
  slug: string;
}

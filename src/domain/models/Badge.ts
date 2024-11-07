import { DatedData } from "@domain/models/app/DatedData";
export interface BadgeRelation {
  badge: Badge;
}
export interface Badge extends DatedData {
  id: number;
  name: string;
  slug: string;
}

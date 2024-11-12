import { DatedData } from "@domain/models/app/DatedData";

export interface BadgeRelation {
  badge: Badge;
}
export interface Badge extends DatedData {
  name: string;
  slug: string;
}

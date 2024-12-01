import type { DatedData } from "@domain/readModels/app/DatedData";

export interface BadgeRelation {
  badge: Badge;
}
export interface Badge extends DatedData {
  name: string;
  slug: string;
}

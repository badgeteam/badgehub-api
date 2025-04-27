import { DatedData } from "@domain/readModels/project/DatedData";

export interface BadgeRelation {
  badge: Badge;
}

export interface Badge extends DatedData {
  name: string;
  slug: string;
}

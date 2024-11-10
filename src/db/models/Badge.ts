import { DatedData } from "./app/DatedData";

export type BadgeSlug = string;
export interface BadgeRelation {
  badge_id: Badge["id"];
}
export interface Badge extends DatedData {
  id: number;
  slug: BadgeSlug;
  name: string;
}

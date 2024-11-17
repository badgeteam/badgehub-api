import { DBDatedData } from "./app/DBDatedData";

export type BadgeSlug = string;
export interface BadgeRelation {
  badge_id: DBBadge["id"];
}
export interface DBInsertBadge {
  slug: BadgeSlug;
  name: string;
}

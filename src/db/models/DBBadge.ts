import { DBDatedData } from "./app/DBDatedData";

export type BadgeSlug = string;
export interface BadgeRelation {
  badge_id: DBBadge["id"];
}
// table name: badges
export interface DBBadge extends DBDatedData {
  id: number;
  slug: BadgeSlug;
  name: string;
}

import { DBDatedData } from "./app/DBDatedData";

export interface BadgeSlugRelation {
  badge_slug: DBBadge["slug"];
}
export interface DBInsertBadge {
  slug: string;
  name: string;
}

// table name: badges
export interface DBBadge extends DBInsertBadge, DBDatedData {}

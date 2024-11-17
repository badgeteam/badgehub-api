import { DBDatedData } from "./app/DBDatedData";

export type BadgeSlug = string;
export interface BadgeSlugRelation {
  badge_slug: DBBadge["slug"];
}
export interface DBInsertBadge {
  slug: BadgeSlug;
  name: string;
}

// table name: badges
export interface DBBadge extends DBInsertBadge, DBDatedData {}

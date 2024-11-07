import { BadgeWithProjectWithStatus } from "./BadgeWithProjectWithStatus";
import { DatedData } from "./app/DatedData";
import { Project } from "./app/Project";
export type BadgeSlug = string;
export interface BadgeRelation {
  badge_slug: BadgeSlug;
}
export interface Badge extends DatedData {
  slug: BadgeSlug;
  name: string;
}

import { ProjectStatusOnBadge } from "./ProjectStatusOnBadge";
import { DatedData } from "./app/DatedData";
import { Project } from "./app/Project";
export type BadgeSlug = string;
export interface BadgeRelation {
  badge_id: Badge["id"];
}
export interface Badge extends DatedData {
  id: number;
  slug: BadgeSlug;
  name: string;
}

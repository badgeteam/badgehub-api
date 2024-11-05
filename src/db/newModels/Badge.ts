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
  constraints?: string;
  commands?: string;

  // Relations
  projects: Array<Project>;
  projects_count?: number;
  states: Array<BadgeWithProjectWithStatus>;
  states_count?: number;
  types: Array<{ slug: string; name: string }>;
}

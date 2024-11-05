import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export type ProjectSlug = string;

export interface Project extends DatedData, UserRelation {
  // Primary key
  slug: ProjectSlug; // The directory name of this app
  git?: string; // repository url
  allow_team_fixes: boolean;
}

export interface ProjectRelation {
  project_slug: ProjectSlug;
}

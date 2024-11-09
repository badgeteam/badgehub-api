import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { VersionRelation } from "./Version";

export type ProjectSlug = string;

export interface Project
  extends DatedData,
    VersionRelation, // The Latest Version
    UserRelation {
  id: number;
  slug: ProjectSlug; // The directory name of this app
  git?: string; // repository url
  allow_team_fixes: boolean;
}

export interface ProjectSlugRelation {
  project_slug: Project["slug"];
}

export interface ProjectRelation {
  project_id: Project["id"];
}

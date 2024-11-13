import { DBUser, UserEmailRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";
import { VersionRelation } from "./DBVersion";

export type ProjectSlug = string;

// table name: projects
export interface DBProject
  extends DBDatedData,
    VersionRelation, // The Latest DBVersion
    UserEmailRelation {
  slug: ProjectSlug; // The directory name of this app
  git?: string; // repository url
  allow_team_fixes: boolean;
}

export interface ProjectSlugRelation {
  project_slug: DBProject["slug"];
}

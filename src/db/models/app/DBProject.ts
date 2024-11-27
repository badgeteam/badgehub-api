import { UserRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";
import { VersionRelation } from "./DBVersion";
import { ProjectSlug } from "@domain/readModels/app/Project";

export interface DBInsertProject
  extends Partial<VersionRelation>, // The Latest DBVersion
    UserRelation {
  slug: ProjectSlug; // The directory name of this app
  git?: string; // repository url
  allow_team_fixes?: boolean;
}

// table name: projects
export interface DBProject extends DBInsertProject, DBDatedData {}

export interface ProjectSlugRelation {
  project_slug: DBProject["slug"];
}

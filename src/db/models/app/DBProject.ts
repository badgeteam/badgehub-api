import { UserRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";
import { ProjectSlug } from "@domain/readModels/app/Project";
import { VersionRelation } from "@db/models/app/DBVersion";

interface DBProjectBase {
  slug: ProjectSlug; // The directory name of this app
  git?: string; // repository url
  allow_team_fixes?: boolean;
}

type ProjectToVersionRelation = VersionRelation<
  "latest_revision" | "draft_revision",
  "revision"
>;

export interface DBInsertProject
  extends DBProjectBase,
    Partial<ProjectToVersionRelation>,
    UserRelation,
    Partial<DBDatedData> {}

// table name: projects
export interface DBProject
  extends DBProjectBase,
    ProjectToVersionRelation,
    UserRelation,
    DBDatedData {}

export interface ProjectSlugRelation {
  project_slug: DBProject["slug"];
}

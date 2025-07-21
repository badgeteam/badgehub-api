import { UserRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";
import { ProjectSlug } from "@shared/domain/readModels/project/ProjectDetails";
import { VersionRelation } from "@shared/dbModels/project/DBVersion";

export interface DBProjectBase {
  slug: ProjectSlug; // The directory name of this project
  git?: string; // repository url
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

import { DBInsertProject } from "@db/models/app/DBProject";

export interface CreateProjectProps
  extends Pick<
    DBInsertProject,
    "allow_team_fixes" | "git" | "slug" | "user_id"
  > {}

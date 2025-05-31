import { DBInsertProject } from "@db/models/project/DBProject";
import { z } from "zod/v3";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface CreateProjectProps
  extends Pick<
    DBInsertProject,
    "allow_team_fixes" | "git" | "slug" | "idp_user_id"
  > {}

export const createProjectPropsSchema = z.object({
  allow_team_fixes: z.boolean().optional(),
  git: z.string().optional(),
  slug: z.string(),
  idp_user_id: z.string(),
});

type Checks = [
  CheckSame<
    CreateProjectProps,
    CreateProjectProps,
    z.infer<typeof createProjectPropsSchema>
  >,
];

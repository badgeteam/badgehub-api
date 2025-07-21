import { DBInsertProject } from "@shared/dbModels/project/DBProject";
import { z } from "zod/v4";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface CreateProjectProps
  extends Pick<DBInsertProject, "git" | "slug" | "idp_user_id"> {}

export const createProjectPropsSchema = z.object({
  git: z.string().optional(),
  slug: z.string(),
  idp_user_id: z.string(),
});

__tsCheckSame<
  CreateProjectProps,
  CreateProjectProps,
  z.infer<typeof createProjectPropsSchema>
>(true);

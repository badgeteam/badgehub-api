import { Version, versionSchema } from "./Version";
import { User } from "./User";
import { DatedData } from "./DatedData";
import { Badge } from "../Badge";
import {
  CategoryName,
  categoryNameSchema,
} from "@shared/domain/readModels/project/Category";
import { z } from "zod/v4";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export type ProjectStatusName =
  | "working"
  | "in_progress"
  | "broken"
  | "unknown";

export const projectStatusNameSchema = z.enum([
  "working",
  "in_progress",
  "broken",
  "unknown",
]);

export interface ProjectCore {
  slug: string;
  idp_user_id: User["idp_user_id"];
  git: string | null; // Git URL of the project, if it exists
  allow_team_fixes: boolean | null;
}

export type ProjectWithoutVersion = Omit<Project, "version">;

export interface Project extends ProjectCore, DatedData {
  // Computed
  name: string;
  // min_firmware: number | null; // Smallest revision number that exists
  // max_firmware: number | null; // Biggest revision number that exists
  git_commit_id: string | null;
  published_at: Date | null; // Last publish date
  icon: string | null; // Relative path to the icon of the project
  // download_counter?: number; // Sum of all version download count|null
  license: string | null; // Eg. MIT
  // size_of_zip?: number;|null
  // size_of_content?: number;|null
  category: CategoryName | null;
  description: string | null; // description in metadata of latest version of the projectct
  revision: number; // latest revsion number of the projectt
  // status?: ProjectStatusName; // Status of newest version with a non-empty status|null
  // user_name?: string; // user->name|null
  interpreter: string | null; // Interpreter for latest version of project

  // Relations
  version: Version;
  badges: Array<Badge["slug"]>;
  // dependencies?: Array<Dependency>; // Changed! We depend on a semantic version specification of a project instead of just the project.|null
  // states?: Array<ProjectStatusOnBadge>;|null
  // versions?: Array<Version>;|null
  // votes?: Array<VoteFromUser>;|null
  // warnings?: Array<WarningFromUser>;|null
  // collaborators?: Array<User>;|null
}

export type ProjectSlug = Project["slug"];

interface Dependency {
  project_slug: ProjectSlug;
  // Changed! semantic_version_range added
  semantic_version_range: string; // Semantic version range specification that allows tilde, caret, wildcard specification of the version of a project that should be used. Following what is described here: https://python-poetry.org/docs/dependency-specification/
}

export const projectSchema = z.object({
  slug: z.string(),
  idp_user_id: z.string(),
  git: z.string().nullable(),
  icon: z.string().nullable(),
  allow_team_fixes: z.boolean().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
  name: z.string(),
  // min_firmware: z.number().nullable(),
  // max_firmware: z.number().nullable(),
  git_commit_id: z.string().nullable(),
  published_at: z.date().nullable(),
  license: z.string().nullable(),
  category: categoryNameSchema.nullable(),
  description: z.string().nullable(),
  revision: z.number(),
  version: versionSchema,
  badges: z.array(z.string()),
  interpreter: z.string().nullable(),
});

export const projectWithoutVersionSchema = projectSchema.omit({
  version: true,
});

type Checks = [
  CheckSame<Project, Project, z.infer<typeof projectSchema>>,
  CheckSame<
    ProjectWithoutVersion,
    ProjectWithoutVersion,
    z.infer<typeof projectWithoutVersionSchema>
  >,
  CheckSame<
    ProjectStatusName,
    ProjectStatusName,
    z.infer<typeof projectStatusNameSchema>
  >,
];

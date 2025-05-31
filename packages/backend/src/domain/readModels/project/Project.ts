import { Version } from "./Version";
import { User } from "./User";
import { DatedData } from "./DatedData";
import { Badge } from "../Badge";
import { AppMetadataJSON } from "./AppMetadataJSON";
import {
  Category,
  categoryNameSchema,
} from "@domain/readModels/project/Category";
import { z } from "zod/v3";
import { CheckExtends, CheckSame } from "@shared/zodUtils/zodTypeComparison";

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
  git?: string;
  allow_team_fixes?: boolean;
}

export type ProjectWithoutVersion = Omit<Project, "version">;

export interface Project extends ProjectCore, DatedData {
  // Computed
  name?: string;
  min_firmware?: number; // Smallest revision number that exists
  max_firmware?: number; // Biggest revision number that exists
  git_commit_id?: string;
  published_at?: Date; // Last publish date
  // download_counter?: number; // Sum of all version download count
  license?: string; // Eg. MIT
  // size_of_zip?: number;
  // size_of_content?: number;
  category: Category["name"];
  description?: string; // description in metadata of latest version of the project
  revision?: number; // latest revsion number of the project
  // status?: ProjectStatusName; // Status of newest version with a non-empty status
  // user_name?: string; // user->name
  interpreter?: AppMetadataJSON["interpreter"]; // Interpreter for latest version of project

  // Relations
  version?: Version;
  badges?: Array<Badge["slug"]>;
  // dependencies?: Array<Dependency>; // Changed! We depend on a semantic version specification of a project instead of just the project.
  // states?: Array<ProjectStatusOnBadge>;
  // versions?: Array<Version>;
  // votes?: Array<VoteFromUser>;
  // warnings?: Array<WarningFromUser>;
  // collaborators?: Array<User>;
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
  git: z.string().optional(),
  allow_team_fixes: z.boolean().optional(),
  created_at: z.date(),
  updated_at: z.date(),
  name: z.string().optional(),
  min_firmware: z.number().optional(),
  max_firmware: z.number().optional(),
  git_commit_id: z.string().optional(),
  published_at: z.date().optional(),
  license: z.string().optional(),
  category: categoryNameSchema,
  description: z.string().optional(),
  revision: z.number().optional(),
  interpreter: z.string().optional(),
});

type Checks = [
  CheckSame<Project, Project, z.infer<typeof projectSchema>>,
  CheckSame<
    ProjectStatusName,
    ProjectStatusName,
    z.infer<typeof projectStatusNameSchema>
  >,
];

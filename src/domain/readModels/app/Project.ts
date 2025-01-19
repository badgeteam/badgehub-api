import { Version } from "./Version";
import { User } from "./User";
import { DatedData } from "./DatedData";
import { Badge } from "../Badge";
import { ProjectStatusOnBadge } from "../ProjectStatusOnBadge";
import { AppMetadataJSON } from "./AppMetadataJSON";
import { VoteFromUser } from "./VoteFromUser";
import { WarningFromUser } from "./WarningFromUser";
import { Category } from "@domain/readModels/app/Category";

export type ProjectStatusName =
  | "working"
  | "in_progress"
  | "broken"
  | "unknown";

export interface ProjectCore {
  slug: string;
  user_id: User["id"];
  git?: string;
  allow_team_fixes?: boolean;
}

export type ProjectWithoutVersion = Exclude<Project, "version">;

export interface Project extends ProjectCore, DatedData {
  // Computed
  name?: string;
  min_firmware?: number; // Smallest revision number that exists
  max_firmware?: number; // Biggest revision number that exists
  git_commit_id?: string;
  published_at?: Date; // Last publish date
  download_counter?: number; // Sum of all version download count
  license?: string; // Eg. MIT
  size_of_zip?: number;
  size_of_content?: number;
  category: Category["name"];
  description?: string; // description in metadata of latest version of the app
  revision?: number; // latest revsion number of the app
  status?: ProjectStatusName; // Status of newest version with a non-empty status
  user_name?: string; // user->name
  interpreter?: AppMetadataJSON["interpreter"]; // Interpreter for latest version of app

  // Relations
  version?: Version;
  badges?: Array<Badge["slug"]>;
  dependencies?: Array<Dependency>; // Changed! We depend on a semantic version specification of a project instead of just the project.
  states?: Array<ProjectStatusOnBadge>;
  versions?: Array<Version>;
  votes?: Array<VoteFromUser>;
  warnings?: Array<WarningFromUser>;
  collaborators?: Array<User>;
}

export type ProjectSlug = Project["slug"];

interface Dependency {
  project_slug: ProjectSlug;
  // Changed! semantic_version_range added
  semantic_version_range: string; // Semantic version range specification that allows tilde, caret, wildcard specification of the version of a project that should be used. Following what is described here: https://python-poetry.org/docs/dependency-specification/
}

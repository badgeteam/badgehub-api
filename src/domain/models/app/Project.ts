import { Version } from "./Version";
import { User } from "./User";
import { DatedData } from "./DatedData";
import { Badge } from "../Badge";
import { ProjectStatusOnBadge } from "../ProjectStatusOnBadge";
import { AppMetadataJSON } from "./AppMetadataJSON";
import { VoteFromUser } from "./VoteFromUser";
import { WarningFromUser } from "./WarningFromUser";
import { AppCategoryName } from "@domain/models/app/Category";

export type ProjectStatusName =
  | "working"
  | "in_progress"
  | "broken"
  | "unknown";

export interface ProjectCore {
  slug: string;
  user_email: User["email"];
  git?: string;
  allow_team_fixes?: boolean;
}

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
  category?: AppCategoryName;
  readonly description?: string; // description in metadata of latest version of the app
  readonly revision?: number; // latest revsion number of the app
  readonly status?: ProjectStatusName; // Status of newest version with a non-empty status
  readonly author?: string; // user->name
  readonly interpreter?: AppMetadataJSON["interpreter"]; // Interpreter for latest version of app

  // Relations
  readonly version?: Version;
  readonly badges?: Array<Badge>;
  readonly dependencies?: Array<Dependency>; // Changed! We depend on a semantic version specification of a project instead of just the project.
  readonly states?: Array<ProjectStatusOnBadge>;
  readonly versions?: Array<Version>;
  readonly votes?: Array<VoteFromUser>;
  readonly warnings?: Array<WarningFromUser>;
  readonly collaborators?: Array<User>;
}

export type ProjectSlug = Project["slug"];

interface Dependency {
  project_slug: ProjectSlug;
  // Changed! semantic_version_range added
  semantic_version_range: string; // Semantic version range specification that allows tilde, caret, wildcard specification of the version of a project that should be used. Following what is described here: https://python-poetry.org/docs/dependency-specification/
}

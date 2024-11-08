import { Version, VersionRelation } from "./Version";
import { User, UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Badge } from "../Badge";
import { ProjectStatusOnBadge } from "../ProjectStatusOnBadge";
import { AppCategoryName, MetadataFileContents } from "./MetadataFileContents";
import { VoteFromUser } from "./VoteFromUser";
import { WarningFromUser } from "./WarningFromUser";
import { ProjectStatusName as DBProjectStatusName } from "@db/newModels/ProjectStatusOnBadge";
export type ProjectStatusName = DBProjectStatusName;

export interface Project
  extends DatedData,
    VersionRelation, // Latest Version
    UserRelation {
  slug: string; // The directory name of this app
  git?: string; // repository url
  allow_team_fixes: boolean;

  // Computed
  name: string;
  min_firmware?: number; // Smallest revision number that exists
  max_firmware?: number; // Biggest revision number that exists
  git_commit_id?: string;
  published_at?: Date; // Last publish date
  download_counter: number; // Sum of all version download count
  license: string; // Eg. MIT
  size_of_zip?: number;
  size_of_content?: number;
  category: AppCategoryName;
  readonly description?: string; // description in metadata of latest version of the app
  readonly revision: string; // latest revsion number of the app
  readonly status: ProjectStatusName; // Status of newest version with a non-empty status
  readonly author: string; // user->name
  readonly interpreter: MetadataFileContents["interpreter"]; // Interpreter for latest version of app

  // Relations
  readonly badges: Array<Badge>;
  readonly dependencies: Array<Dependency>; // Changed! We depend on a semantic version specification of a project instead of just the project.
  readonly states: Array<ProjectStatusOnBadge>;
  readonly versions: Array<Version>;
  readonly votes: Array<VoteFromUser>;
  readonly warnings: Array<WarningFromUser>;
  readonly collaborators: Array<User>;
}

export type ProjectSlug = Project["slug"];

interface Dependency {
  project_slug: ProjectSlug;
  // Changed! semantic_version_range added
  semantic_version_range: string; // Semantic version range specification that allows tilde, caret, wildcard specification of the version of a project that should be used. Following what is described here: https://python-poetry.org/docs/dependency-specification/
}

export interface ProjectRelation {
  project: Project;
}

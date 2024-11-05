import { Version } from "./Version";
import { AppCategory } from "./MetadataFileContents";
import { User, UserRelation, Vote, Warning } from "./User";
import { DatedData } from "./DatedData";
import { Badge } from "../Badge";
import { BadgeProject } from "../BadgeProject";

export interface Project extends DatedData, UserRelation {
  id: number;
  category_id: number;
  name: string;
  slug: string; // The directory name of this app
  min_firmware?: number; // Smallest revision number that exists
  max_firmware?: number; // Biggest revision number that exists
  git?: string; // repository url
  git_commit_id?: string;
  published_at?: Date; // Last publish date
  download_counter: number;
  license: string; // Eg. MIT
  allow_team_fixes: boolean;
  size_of_zip?: number;
  size_of_content?: number;
  category: AppCategory;

  // Computed
  readonly description?: string; // description in metadata of latest version of the app
  readonly revision: string; // latest revsion number of the app
  readonly latest_semantic_version?: string; // Changed! The latest version of the app
  readonly status: ProjectStatus; // Status of newest version with a non-empty status
  readonly author: string; // user->name

  // Relations
  readonly badges: Array<Badge>;
  readonly dependants: Array<Project>;
  readonly dependencies: Array<Dependency>; // Changed! We depend on a semanctic version specification of a project instead of just the project.
  readonly states: Array<BadgeProject>;
  readonly versions: Array<Version>;
  readonly votes: Array<Vote>;
  readonly warnings: Array<Warning>;
  readonly collaborators: Array<User>;
  readonly interpreter: string; // Changed! this replaces the app_type. The name of the interpreter app (or built-in, like 'python')

  // Relation Counts
  readonly badges_count?: number;
  readonly dependants_count?: number;
  readonly dependencies_count?: number;
  readonly states_count?: number;
  readonly versions_count?: number;
  readonly votes_count?: number;
  readonly warnings_count?: number;
  readonly collaborators_count?: number;
}

interface Dependency {
  // Changed! Added
  project: Project;
  semantic_version_range: string; // Semantic version range specification that allows tilde, caret, wildcard specification of the version of a project that should be used. Following what is described here: https://python-poetry.org/docs/dependency-specification/
}

export interface ProjectRelation {
  project_id: number;
  project: Project;
}

export type ProjectStatus = "working" | "in_progress" | "broken" | "unknown";

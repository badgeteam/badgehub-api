import { DatedData } from "./app/badgehub/DatedData";
import { Project } from "./app/badgehub/Project";
import { BadgeProject } from "./BadgeProject";

export interface Badge extends DatedData {
  id: number;
  name: string;
  slug: string;
  constraints?: string;
  commands?: string;

  // Relations
  projects: Array<Project>;
  projects_count?: number;
  states: Array<BadgeProject>;
  states_count?: number;
  types: Array<{ slug: string; name: string }>;
}

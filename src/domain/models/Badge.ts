import { BadgeProject } from "./BadgeProject";
import { Project } from "@domain/models/app/Project";
import { DatedData } from "@domain/models/app/DatedData";

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

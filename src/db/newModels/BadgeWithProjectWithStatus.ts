import { ProjectRelation } from "./app/Project";
import { DatedData } from "./app/DatedData";
import { BadgeRelation, BadgeSlug } from "./Badge";

export interface BadgeWithProjectWithStatus
  extends ProjectRelation,
    DatedData,
    BadgeRelation {
  id: number;
  status: ProjectStatusName; // Status for this project for this particular badge
}

export type ProjectStatusName =
  | "working"
  | "in_progress"
  | "broken"
  | "unknown";

import { Badge } from "./Badge";
import { ProjectRelation, ProjectStatus } from "@domain/models/app/Project";
import { DatedData } from "@domain/models/app/DatedData";

export interface BadgeProject extends ProjectRelation, DatedData {
  id: number;
  badge_id: number;
  status: ProjectStatus; // Status for this project for this particular badge

  // Relations
  badge: Badge;
}

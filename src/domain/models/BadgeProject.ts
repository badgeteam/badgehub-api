import { DatedData } from "./app/badgehub/DatedData";
import { Badge } from "./Badge";
import { ProjectRelation, ProjectStatus } from "./app/badgehub/Project";

export interface BadgeProject extends ProjectRelation, DatedData {
  id: number;
  badge_id: number;
  status: ProjectStatus; // Status for this project for this particular badge

  // Relations
  badge: Badge;
}

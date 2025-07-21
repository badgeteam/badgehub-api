import { ProjectSummary } from "@shared/domain/readModels/project/ProjectDetails.ts";

export type AppCardProps = ProjectSummary & {
  editable?: boolean;
};

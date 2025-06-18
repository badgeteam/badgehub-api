import { ProjectWithoutVersion } from "@shared/domain/readModels/project/Project.ts";

export type AppCardProps = ProjectWithoutVersion & {
  editable?: boolean;
};

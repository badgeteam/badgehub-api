import { CategorySlug } from "@shared/domain/readModels/project/Category.ts";
import { BadgeSlug } from "@shared/domain/readModels/Badge.ts";

export type ProjectEditFormData = {
  name: string;
  media: string[];
  version: string;
  description: string;
  badge: BadgeSlug | undefined;
  category: CategorySlug | undefined;
  license: string;
  main_executable: string;
};

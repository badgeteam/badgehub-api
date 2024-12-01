import type { DBDatedData } from "@db/models/app/DBDatedData";
import type { AppCategoryName } from "@domain/readModels/app/Category";

// table name: categories
export interface DBCategory extends DBDatedData {
  name: AppCategoryName;
  slug: string;
}

import { DBDatedData } from "@db/models/project/DBDatedData";
import { AppCategoryName } from "@domain/readModels/project/Category";

// table name: categories
export interface DBCategory extends DBDatedData {
  name: AppCategoryName;
  slug: string;
}

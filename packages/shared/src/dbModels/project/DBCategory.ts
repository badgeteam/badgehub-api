import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import { AppCategoryName } from "@shared/domain/readModels/project/Category";

// table name: categories
export interface DBCategory extends DBDatedData {
  name: AppCategoryName;
  slug: string;
}

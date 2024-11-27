import { DBDatedData } from "@db/models/app/DBDatedData";
import { AppCategoryName } from "@domain/readModels/app/Category";

// table name: categories
export interface DBCategory extends DBDatedData {
  name: AppCategoryName;
  slug: string;
}

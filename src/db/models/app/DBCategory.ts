import { DBDatedData } from "@db/models/app/DBDatedData";
import { AppCategoryName } from "@domain/readModels/app/Category";

export interface DBCategory extends DBDatedData {
  name: AppCategoryName;
  slug: string;
}

import { DBDatedData } from "@db/models/app/DBDatedData";
import { AppCategoryName } from "@domain/models/app/Category";

export interface CategoryNameRelation {
  category: DBCategory["name"];
}

export interface DBCategory extends DBDatedData {
  name: AppCategoryName;
}

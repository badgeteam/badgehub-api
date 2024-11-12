import { DBDatedData } from "@db/models/app/DBDatedData";
import { AppCategoryName } from "@domain/models/app/Category";

export interface CategoryRelation {
  category_id: DBCategory["id"];
}

export interface CategoryNameRelation {
  category: DBCategory["name"];
}

export interface DBCategory extends DBDatedData {
  id: number;
  name: AppCategoryName;
}

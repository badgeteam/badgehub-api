import { DatedData } from "@db/models/app/DatedData";
import { AppCategoryName } from "@domain/models/app/Category";

export interface CategoryRelation {
  category_id: Category["id"];
}

export interface CategoryNameRelation {
  category: Category["name"];
}

export interface Category extends DatedData {
  id: number;
  name: AppCategoryName;
}

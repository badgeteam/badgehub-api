import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import {
  CategoryName,
  CategorySlug,
} from "@shared/domain/readModels/project/Category";

// table name: categories
export interface DBCategory extends DBDatedData {
  name: CategoryName;
  slug: CategorySlug;
}

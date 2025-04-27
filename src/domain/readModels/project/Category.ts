import { DBCategory } from "@db/models/project/DBCategory";

export type AppCategoryName =
  | "Uncategorised"
  | "Event related"
  | "Games"
  | "Graphics"
  | "Hardware"
  | "Utility"
  | "Wearable"
  | "Data"
  | "Silly"
  | "Hacking"
  | "Troll"
  | "Unusable"
  | "Adult"
  | "Virus"
  | "SAO"
  | "Interpreter"; // Changed! the interpreter categorySlug was added here for the case of libraries.

export interface CategorySlugRelation {
  category_slug: DBCategory["slug"];
}

export interface CategoryNameRelation {
  category_name: DBCategory["name"];
}

export interface Category {
  name: AppCategoryName;
  slug: string;
}

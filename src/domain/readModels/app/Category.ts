import type { DBCategory } from "@db/models/app/DBCategory";

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
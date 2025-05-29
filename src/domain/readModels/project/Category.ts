import { DBCategory } from "@db/models/project/DBCategory";
import { z } from "zod/v3";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

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

export const categoryNameSchema = z.enum([
  "Uncategorised",
  "Event related",
  "Games",
  "Graphics",
  "Hardware",
  "Utility",
  "Wearable",
  "Data",
  "Silly",
  "Hacking",
  "Troll",
  "Unusable",
  "Adult",
  "Virus",
  "SAO",
  "Interpreter",
]);

export const categorySchema = z.object({
  name: categoryNameSchema,
  slug: z.string(),
});

type Checks = [
  CheckSame<
    AppCategoryName,
    AppCategoryName,
    z.infer<typeof categoryNameSchema>
  >,
  CheckSame<Category, Category, z.infer<typeof categorySchema>>,
];

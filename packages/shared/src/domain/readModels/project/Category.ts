import { DBCategory } from "@shared/dbModels/project/DBCategory";
import { z } from "zod/v3";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface Category {
  name: AppCategoryName;
  slug: string;
}

export const CATEGORY_MAP = {
  uncategorised: "Uncategorised",
  event_related: "Event related",
  games: "Games",
  graphics: "Graphics",
  hardware: "Hardware",
  utility: "Utility",
  wearable: "Wearable",
  data: "Data",
  silly: "Silly",
  hacking: "Hacking",
  troll: "Troll",
  unusable: "Unusable",
  adult: "Adult",
  virus: "Virus",
  sao: "SAO",
  interpreter: "Interpreter",
} as const;

export type AppCategoryName = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP]; // Changed! the interpreter categorySlug was added here for the case of libraries.

export interface CategorySlugRelation {
  category_slug: DBCategory["slug"];
}

export interface CategoryNameRelation {
  category_name: DBCategory["name"];
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

import { DBCategory } from "@shared/dbModels/project/DBCategory";
import { z } from "zod/v4";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface Category {
  name: CategoryName;
  slug: CategorySlug;
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

export const CATEGORY_SLUGS = Object.keys(CATEGORY_MAP) as Array<
  keyof typeof CATEGORY_MAP
>;
export const REVERSE_CATEGORY_MAP = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([key, value]) => [value, key])
) as Record<CategoryName, CategorySlug>;
export type CategorySlug = keyof typeof CATEGORY_MAP;

export type CategoryName = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP]; // Changed! the interpreter categorySlug was added here for the case of libraries.

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
] as const satisfies CategoryName[]);

export const categorySlugSchema = z.enum([
  "uncategorised",
  "event_related",
  "games",
  "graphics",
  "hardware",
  "utility",
  "wearable",
  "data",
  "silly",
  "hacking",
  "troll",
  "unusable",
  "adult",
  "virus",
  "sao",
  "interpreter",
] as const satisfies CategorySlug[]);

export const categorySchema = z.object({
    name: categoryNameSchema,
    slug: categorySlugSchema
})

// noinspection JSUnusedLocalSymbols
type Checks = [CheckSame<Category, z.infer<typeof categorySchema>, Category>];
import { z } from "zod/v4";

export const DEFAULT_CATEGORY_NAMES: string[] = [
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
]; // TODO move to deployment config

export const categoryNameSchema = z.string();
export type CategoryName = string;

export function getCategoryNames() {
  return DEFAULT_CATEGORY_NAMES;
}

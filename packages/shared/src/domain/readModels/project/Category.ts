import { z } from "zod/v3";
import { getSharedConfig } from "../../../config/sharedConfig";

export const categoryNameSchema = z.string();
export type CategoryName = string;

export function getCategoryNames() {
  return getSharedConfig().categories;
}

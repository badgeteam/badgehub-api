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
  | "Interpreter"; // Changed! the interpreter category was added here for the case of libraries.

export interface HasCategory {
  category: AppCategoryName;
}
export interface Category {
  name: AppCategoryName;
}
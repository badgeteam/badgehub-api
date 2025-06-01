import type { AppCardProps } from "@components/types.ts";
import { CATEGORIES } from "@shared/domain/readModels/project/Category.ts";

export const dummyApps: AppCardProps[] = [
  {
    slug: "dummy-app-1",
    name: "Dummy App 1",
    description: "A test app",
    category: CATEGORIES.silly,
    published_at: new Date(),
    revision: 1,
    badges: ["mch2022", "why2025"],
  },
  {
    slug: "dummy-app-2",
    name: "Dummy App 2",
    description: "Another test app",
    category: CATEGORIES.silly,
    published_at: new Date(),
    revision: 1,
    badges: ["troopers23"],
  },
  {
    slug: "dummy-app-3",
    name: "Dummy App 3",
    description: "Yet another test app",
    category: CATEGORIES.silly,
    published_at: new Date(),
    revision: 1,
    badges: ["troopers23", "why2025"],
  },
  {
    slug: "dummy-app-4",
    name: "Dummy App 4",
    description: "Wearable device app",
    category: CATEGORIES.games,
    published_at: new Date(),
    revision: 1,
    badges: [],
  },
];

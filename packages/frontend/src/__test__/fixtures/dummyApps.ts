import type { AppCardProps } from "@components/types.ts";
import { CATEGORIE_NAMES } from "@shared/domain/readModels/project/Category.ts";
import { BADGE_NAMES } from "@shared/domain/readModels/Badge.ts";

export const dummyApps: AppCardProps[] = [
  {
    slug: "dummy-app-1",
    name: "Dummy App 1",
    description: "A test app",
    category: CATEGORIE_NAMES.silly,
    published_at: new Date(),
    revision: 1,
    badges: [BADGE_NAMES.mch2022, BADGE_NAMES.why2025],
  },
  {
    slug: "dummy-app-2",
    name: "Dummy App 2",
    description: "Another test app",
    category: CATEGORIE_NAMES.silly,
    published_at: new Date(),
    revision: 1,
    badges: [BADGE_NAMES.troopers23],
  },
  {
    slug: "dummy-app-3",
    name: "Dummy App 3",
    description: "Yet another test app",
    category: CATEGORIE_NAMES.silly,
    published_at: new Date(),
    revision: 1,
    badges: [BADGE_NAMES.troopers23, BADGE_NAMES.why2025],
  },
  {
    slug: "dummy-app-4",
    name: "Dummy App 4",
    description: "Wearable device app",
    category: CATEGORIE_NAMES.games,
    published_at: new Date(),
    revision: 1,
    badges: [],
  },
] as const;

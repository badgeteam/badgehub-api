import type { Project } from "../contracts/publicRestContracts";

export interface AppCardProps {
  slug: string;
  name?: string;
  description?: string;
  category: string;
  published_at?: string;
  revision?: number;
  badges?: string[];
}

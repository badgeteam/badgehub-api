export interface AppCardProps {
  slug: string;
  name: string | null;
  description: string | null;
  category: string;
  published_at: Date | null;
  revision: number | null;
  badges: string[];
}

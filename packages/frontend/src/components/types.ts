export interface AppCardProps {
  slug: string;
  name: string | null;
  description: string | null;
  category: string | null;
  published_at: Date | null;
  revision: number | null;
  badges: string[];
}

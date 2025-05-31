export interface AppCardProps {
  slug: string;
  name?: string;
  description?: string;
  category: string;
  published_at?: Date;
  revision?: number;
  badges?: string[];
}

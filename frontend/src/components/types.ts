export interface AppCardProps {
  title: string;
  description: string;
  tags: { label: string; isMcu?: boolean }[];
  author: string;
  authorLink?: string;
  rating: number;
  ratingCount: number;
  downloads: string;
}

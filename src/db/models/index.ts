export interface Device {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface App {
  name: string;
  slug: string;
  category_slug: string;
  user_name: string;
}

export interface AppDetails {
  name: string;
  slug: string;
  description: string;
  category_slug: string;
  user_name: string;
  devices: string[];
}

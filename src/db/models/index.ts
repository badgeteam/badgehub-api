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

export interface AppDetails extends App {
  description: string;
  devices: string[];
}

const exampleApp: AppDetails = {
  name: "example",
  slug: "example",
  category_slug: "example",
  user_name: "example",
  description: "example",
  devices: ["example"],
};

import { DBDatedData } from "@db/models/app/DBDatedData";

export interface DBCategory extends DBDatedData {
  name: string;
  slug: string;
}

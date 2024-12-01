import type { DatedData } from "./DatedData";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  id: number;
  email: string;
  admin: boolean;
  name: string;
  password: string;
  remember_token?: string;
  editor: string;
  public: boolean;
  show_projects: boolean;
  email_verified_at?: Date;
}

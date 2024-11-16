import { DatedData } from "./DatedData";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  admin: boolean;
  name: string;
  email: string;
  password: string;
  remember_token?: string;
  editor: string;
  public: boolean;
  show_projects: boolean;
  email_verified_at?: Date;
}

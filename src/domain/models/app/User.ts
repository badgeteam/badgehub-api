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
  google2fa_enabled: boolean;
  google2fa_secret?: string;
  email_verified_at?: Date;
}

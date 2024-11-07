import { DatedData } from "./DatedData";

export type UserId = number;
export interface UserRelation {
  user_id: UserId;
}

export interface User extends DatedData {
  id: UserId;
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

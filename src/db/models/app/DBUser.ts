import { DBDatedData } from "./DBDatedData";

export interface UserRelation {
  user_id: DBUser["id"];
}

export interface DBUser extends DBDatedData {
  id: number;
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

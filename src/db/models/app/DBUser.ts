import { DBDatedData } from "./DBDatedData";
import { TimestampTZ } from "@db/DBTypes";

export interface UserRelation {
  user_id: DBUser["id"];
}
// table name: users
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
  email_verified_at?: TimestampTZ;
}

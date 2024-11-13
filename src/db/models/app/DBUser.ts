import { DBDatedData } from "./DBDatedData";
import { TimestampTZ } from "@db/DBTypes";

export interface UserEmailRelation {
  user_email: DBUser["email"];
}
// table name: users
export interface DBUser extends DBDatedData {
  email: string;
  admin: boolean;
  name: string;
  password: string;
  remember_token?: string;
  editor: string;
  public: boolean;
  show_projects: boolean;
  google2fa_enabled: boolean;
  google2fa_secret?: string;
  email_verified_at?: TimestampTZ;
}

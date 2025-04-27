import { DBDatedData } from "./DBDatedData";
import { TimestampTZ } from "@db/DBTypes";

export interface UserRelation {
  user_id: DBUser["id"];
}

export interface DBInsertUser {
  id: number;
  email: string;
  admin?: boolean;
  name: string;
  password: string;
  remember_token?: string;
  editor?: string;
  public?: boolean;
  show_projects?: boolean;
  email_verified_at?: TimestampTZ;
}

// table name: users
export interface DBUser extends DBInsertUser, DBDatedData {}

import { DatedData } from "./DatedData";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  idp_user_id: string;
}

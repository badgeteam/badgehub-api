import { VoteRelation } from "./Vote";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
export interface VoteFromUserRelation {
  vote_from_user_id: number;
}

export interface VoteFromUser extends VoteRelation, UserRelation, DatedData {
  id: number;
}

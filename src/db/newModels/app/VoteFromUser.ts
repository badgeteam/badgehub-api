import { VoteRelation } from "./Vote";
import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
export interface VoteFromUserRelation {
  vote_from_user_id: VoteFromUser["id"];
}

export interface VoteFromUser extends VoteRelation, UserRelation, DatedData {
  id: number;
}

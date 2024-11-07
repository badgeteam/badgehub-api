import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Vote } from "@db/newModels/app/Vote";
export interface VoteFromUserRelation {
  vote_from_user_id: VoteFromUser["id"];
}

export interface VoteFromUser extends Vote, UserRelation, DatedData {
  id: number;
}

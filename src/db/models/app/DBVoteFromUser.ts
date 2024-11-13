import { VoteRelation } from "./DBVote";
import { UserEmailRelation } from "./DBUser";
import { DBDatedData } from "./DBDatedData";

export interface VoteFromUserRelation {
  vote_from_user_id: DBVoteFromUser["id"];
}

export interface DBVoteFromUser
  extends VoteRelation,
    UserEmailRelation,
    DBDatedData {
  id: number;
}

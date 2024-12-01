import type { VoteRelation } from "./DBVote";
import type { UserRelation } from "./DBUser";
import type { DBDatedData } from "./DBDatedData";

export interface VoteFromUserRelation {
  vote_from_user_id: DBVoteFromUser["id"];
}

export interface DBVoteFromUser
  extends VoteRelation,
    UserRelation,
    DBDatedData {
  id: number;
}

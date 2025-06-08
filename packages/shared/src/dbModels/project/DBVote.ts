import { Vote } from "@shared/domain/readModels/project/VoteFromUser";

export interface VoteRelation {
  vote_id: DBVote["id"];
}

export interface DBVote extends Vote {
  id: number;
}

import { Vote } from "@domain/readModels/app/VoteFromUser";

export interface VoteRelation {
  vote_id: DBVote["id"];
}

export interface DBVote extends Vote {
  id: number;
}

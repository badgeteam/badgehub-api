import { Vote } from "@domain/models/app/VoteFromUser";

export interface VoteRelation {
  vote_id: DBVote["id"];
}

export interface DBVote extends Vote {
  id: number;
}

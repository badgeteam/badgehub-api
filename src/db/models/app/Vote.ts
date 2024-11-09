export interface VoteRelation {
  vote_id: Vote["id"];
}

export interface Vote {
  id: number;
  type: "up" | "down" | "pig";
  comment?: string;
}

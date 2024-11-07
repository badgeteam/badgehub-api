import { UserRelation } from "./User";
import { ProjectRelation } from "./Project";
import { DatedData } from "./DatedData";

type VoteId = number;
export interface VoteRelation {
  vote_id: Vote["id"];
}

export interface Vote {
  id: VoteId;
  type: "up" | "down" | "pig";
  comment?: string;
}

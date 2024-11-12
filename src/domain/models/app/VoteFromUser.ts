import { UserRelation } from "./User";
import { DatedData } from "./DatedData";

export interface Vote {
  type: "up" | "down" | "pig";
  comment?: string;
}

export interface VoteFromUser extends Vote, UserRelation, DatedData {}

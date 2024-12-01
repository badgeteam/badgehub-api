import type { UserRelation } from "./User";
import type { DatedData } from "./DatedData";

export interface Vote {
  type: "up" | "down" | "pig";
  comment?: string;
}

export interface VoteFromUser extends Vote, UserRelation, DatedData {}

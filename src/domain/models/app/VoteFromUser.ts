import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Vote } from "@db/models/app/Vote";

export interface VoteFromUser
  extends Exclude<Vote, "id">,
    UserRelation,
    DatedData {}

import { UserRelation } from "./User";
import { DatedData } from "./DatedData";
import { Vote } from "@db/newModels/app/Vote";

export interface VoteFromUser
  extends Exclude<Vote, "id">,
    UserRelation,
    DatedData {}

import { ProjectRelation } from "../Project";
import { DatedData } from "../DatedData";
import { UserRelation } from "../User";
import { WarningRelation } from "../Warning";
import { VoteRelation } from "../Vote";
import { VoteFromUserRelation } from "../VoteFromUser";

export interface ProjectWithVoteFromUser
  extends VoteFromUserRelation,
    ProjectRelation {
  id: number;
}

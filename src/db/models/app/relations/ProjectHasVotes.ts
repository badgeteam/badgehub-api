import { ProjectRelation } from "../Project";
import { DatedData } from "../DatedData";
import { UserRelation } from "../User";
import { WarningRelation } from "../Warning";
import { VoteRelation } from "../Vote";
import { VoteFromUserRelation } from "../VoteFromUser";

export interface ProjectHasVotes extends VoteFromUserRelation, ProjectRelation {
  id: number;
}

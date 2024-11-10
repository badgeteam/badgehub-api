import { ProjectRelation } from "../Project";
import { VoteFromUserRelation } from "../VoteFromUser";

export interface ProjectHasVotes extends VoteFromUserRelation, ProjectRelation {
  id: number;
}

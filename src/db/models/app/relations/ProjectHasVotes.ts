import { ProjectRelation } from "../DBProject";
import { VoteFromUserRelation } from "../DBVoteFromUser";

export interface ProjectHasVotes extends VoteFromUserRelation, ProjectRelation {
  id: number;
}

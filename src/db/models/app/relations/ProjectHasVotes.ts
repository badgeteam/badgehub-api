import { ProjectSlugRelation } from "../DBProject";
import { VoteFromUserRelation } from "../DBVoteFromUser";

// TODO implement table
export interface ProjectHasVotes
  extends VoteFromUserRelation,
    ProjectSlugRelation {
  id: number;
}

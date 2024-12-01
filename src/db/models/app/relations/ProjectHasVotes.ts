import type { ProjectSlugRelation } from "../DBProject";
import type { VoteFromUserRelation } from "../DBVoteFromUser";

// TODO implement table
export interface ProjectHasVotes
  extends VoteFromUserRelation,
    ProjectSlugRelation {
  id: number;
}

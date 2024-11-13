import { ProjectSlugRelation } from "../DBProject";
import { VoteFromUserRelation } from "../DBVoteFromUser";

export interface ProjectHasVotes
  extends VoteFromUserRelation,
    ProjectSlugRelation {
  id: number;
}

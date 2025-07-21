import { DatedData, datedDataSchema } from "./DatedData";
import { z } from "zod/v4";
import { __tsCheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  idp_user_id: string;
}

export const userSchema = datedDataSchema.extend({
  idp_user_id: z.string(),
});

__tsCheckSame<User, User, z.infer<typeof userSchema>>(true);

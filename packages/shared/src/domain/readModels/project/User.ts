import { DatedData, datedDataSchema } from "./DatedData";
import { z } from "zod/v3";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface UserRelation {
  user: User;
}

export interface User extends DatedData {
  idp_user_id: string;
}

export const userSchema = datedDataSchema.extend({
  idp_user_id: z.string(),
});

type Checks = [CheckSame<User, User, z.infer<typeof userSchema>>];

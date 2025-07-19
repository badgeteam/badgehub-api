import { UserRelation, userSchema } from "./User";
import { DatedData, datedDataSchema } from "./DatedData";
import { z } from "zod/v4";
import { CheckSame } from "@shared/zodUtils/zodTypeComparison";

export interface Warning {
  description: string;
}

export interface WarningFromUser extends Warning, UserRelation, DatedData {}

export const warningFromUserSchema = datedDataSchema.extend({
  description: z.string(),
  user: userSchema,
});

type Checks = [
  CheckSame<
    WarningFromUser,
    WarningFromUser,
    z.infer<typeof warningFromUserSchema>
  >,
];

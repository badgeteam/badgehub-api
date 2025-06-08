import { z } from "zod";

export type CheckSame<
  TS_TYPE,
  TS_TYPE_REPEAT extends INFERRED_ZOD_TYPE,
  INFERRED_ZOD_TYPE extends TS_TYPE,
> = never;

export type CheckExtends<T1, T2 extends T1> = never;

// Example usage with a Zod schema
type Dog = {
  name: string;
  neutered: boolean;
};

const dogSchema = z.object({
  name: z.string().min(3),
  neutered: z.boolean(),
});

type Checks = [CheckSame<Dog, Dog, z.infer<typeof dogSchema>>];

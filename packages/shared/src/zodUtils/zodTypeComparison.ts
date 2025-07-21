import { z } from "zod/v4";

/** @deprecated use __tsCheckSame instead */
export type CheckSame<
  TS_TYPE,
  TS_TYPE_REPEAT extends INFERRED_ZOD_TYPE,
  INFERRED_ZOD_TYPE extends TS_TYPE,
> = unknown;

type EqualTypes<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export const __tsCheckSame = <T1, T1_REPEAT extends T2, T2 extends T1>(
  value?: EqualTypes<T1, T2>
) => undefined;

// Example usage with a Zod schema
type Dog = {
  name: string;
  neutered: boolean;
  optional?: string;
};

const dogSchema = z.object({
  name: z.string().min(3),
  neutered: z.boolean(),
  optional: z.string().optional(),
});

__tsCheckSame<Dog, Dog, z.infer<typeof dogSchema>>(true); // Should give a typescript error as well because of the mismatch in the optional property

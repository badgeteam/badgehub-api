type EqualTypes<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

/**
 * See [zodTypeComparison.tstest.ts](./zodTypeComparison.tstest.ts) for how to use this what this can do.
 */
export const __tsCheckSame = <T1, T1_REPEAT extends T2, T2 extends T1>(
  value: EqualTypes<T1, T2>
) => undefined;

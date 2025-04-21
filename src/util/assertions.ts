class NullOrUndefinedError extends Error {}

type AssertNull = <T>(
  item: T | null,
  errorMessage?: string
) => asserts item is T;

export const assertNotNull: AssertNull = (item, message) => {
  if (item === null) {
    const maybeReasonMessage = message ? ` (${message})` : "";
    throw new NullOrUndefinedError(
      `Unexpected value: null${maybeReasonMessage}`
    );
  }
};

type AssertDefined = <T>(
  item: T | undefined,
  errorMessage?: string
) => asserts item is T;

export const assertDefined: AssertDefined = (item, message) => {
  if (item === undefined) {
    const maybeReasonMessage = message ? ` (${message})` : "";
    throw new NullOrUndefinedError(
      `Unexpected value: undefined${maybeReasonMessage}`
    );
  }
};
type AssertDefinedAndNotNull = <T>(
  item: T | undefined | null,
  errorMessage?: string
) => asserts item is T;

export const assertDefinedAndNotNull: AssertDefinedAndNotNull = (
  item,
  errorMessage
) => {
  assertDefined(item, errorMessage);
  assertNotNull(item, errorMessage);
};

export type WithRequiredProp<T, K extends keyof T> = Omit<T, "published_at"> &
  Required<Pick<T, K>>;

type AssertDefinedProp = <T extends object, K extends keyof T>(
  item: T | undefined,
  prop: K,
  errorMessage?: string
) => asserts item is T & WithRequiredProp<T, K>;

export const assertDefinedProp: AssertDefinedProp = (item, prop, message) => {
  if (!propIsDefined(item, prop)) {
    const maybeReasonMessage = message ? ` (${message})` : "";
    throw new Error(`Unexpected value: undefined${maybeReasonMessage}`);
  }
};

export const propIsDefined = <T extends object, K extends keyof T>(
  item: T | undefined,
  prop: K
): item is T & WithRequiredProp<T, K> => item?.[prop] !== undefined;

export const propIsDefinedAndNotNull = <T extends object, K extends keyof T>(
  item: T | undefined | null,
  prop: K
): item is T & WithRequiredProp<T, K> =>
  item?.[prop] !== undefined && item?.[prop] !== null;

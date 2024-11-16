function entryHasDefinedValue<K, V>(
  entry: [K, V]
): entry is [K, V extends undefined ? never : V] {
  return entry[1] !== undefined;
}

type Entry<T extends object> = NonNullable<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
>;

export function getEntriesWithDefinedValues<T extends object>(
  obj: T
): Entry<T>[] {
  const typedEntries = Object.entries(obj) as Entry<T>[];
  return typedEntries.filter(entryHasDefinedValue);
}

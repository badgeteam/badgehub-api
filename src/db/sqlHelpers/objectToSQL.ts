import { getEntriesWithDefinedValues } from "@util/objectEntries";
import { join, raw } from "sql-template-tag";

export function getInsertKeysAndValuesSql(user: Object) {
  const definedEntries = getEntriesWithDefinedValues(user);
  const keys = join(definedEntries.map(([key]) => raw(key))); // raw is ok here because these keys are checked against our typescript definitions by tsoa
  const values = join(definedEntries.map(([, value]) => value));
  return { keys, values };
}

import { DBDatedData } from "@db/models/app/DBDatedData";
import { DatedData } from "@domain/readModels/app/DatedData";
import moment from "moment/moment";

export function dateStringsToDates(dbDatedData: DBDatedData): DatedData {
  const datedData: DatedData = {
    created_at: timestampTZToDate(dbDatedData.created_at),
    updated_at: timestampTZToDate(dbDatedData.updated_at),
  };
  if (dbDatedData.deleted_at) {
    datedData.deleted_at = timestampTZToDate(dbDatedData.deleted_at);
  }
  return datedData;
}

export function timestampTZToDate<T extends string | undefined>(
  dbDate: T
): T extends undefined ? undefined : Date {
  return (
    dbDate !== undefined ? moment(dbDate).toDate() : undefined
  ) as T extends undefined ? undefined : Date;
}

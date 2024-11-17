import { DBDatedData } from "@db/models/app/DBDatedData";
import { DatedData } from "@domain/readModels/app/DatedData";
import moment from "moment/moment";

export function dateStringsToDates(dbDatedData: DBDatedData): DatedData {
  const datedData: DatedData = {
    created_at: moment(dbDatedData.created_at).toDate(),
    updated_at: moment(dbDatedData.updated_at).toDate(),
  };
  if (dbDatedData.deleted_at) {
    datedData.deleted_at = moment(dbDatedData.deleted_at).toDate();
  }
  return datedData;
}

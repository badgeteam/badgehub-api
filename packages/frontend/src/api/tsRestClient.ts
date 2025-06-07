import { initClient } from "@ts-rest/core";
import { publicRestContracts } from "@shared/contracts/publicRestContracts";

export const BADGEHUB_API_BASE_URL = "";
export const tsRestClient = initClient(publicRestContracts, {
  baseUrl: BADGEHUB_API_BASE_URL + "/api/v3",
  baseHeaders: {},
});

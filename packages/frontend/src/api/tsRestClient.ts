import { initClient } from "@ts-rest/core";
import { publicRestContracts } from "@shared/contracts/publicRestContracts";
import { BADGEHUB_API_BASE_URL } from "@config.ts";

export const tsRestClient = initClient(publicRestContracts, {
  baseUrl: BADGEHUB_API_BASE_URL + "/api/v3",
  baseHeaders: {},
});

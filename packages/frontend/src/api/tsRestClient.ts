import { initClient } from "@ts-rest/core";
import { BADGEHUB_API_BASE_URL } from "@config.ts";
import { tsRestApiContracts } from "@shared/contracts/restContracts.ts";

export const tsRestClient = initClient(tsRestApiContracts, {
  baseUrl: BADGEHUB_API_BASE_URL + "/api/v3",
  baseHeaders: {},
});

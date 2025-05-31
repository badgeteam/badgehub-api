import { initClient } from "@ts-rest/core";
import { publicRestContracts } from "@shared/contracts/publicRestContracts";

export const tsRestClient = initClient(publicRestContracts, {
  baseUrl: "http://localhost:8081/api/v3", // Adjust if your API is served elsewhere
  baseHeaders: {},
});

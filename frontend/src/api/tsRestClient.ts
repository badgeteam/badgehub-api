import { initClient } from "@ts-rest/core";
import { publicRestContracts } from "../../../src/shared/contracts/publicRestContracts";

export const tsRestClient = initClient(publicRestContracts, {
  baseUrl: "/api", // Adjust if your API is served elsewhere
  baseHeaders: {},
  // credentials: 'include', // Uncomment if you need cookies
});

import type { AppCardProps } from "@components/types.ts";
import { dummyApps } from "@__test__/fixtures";
import { ApiFetcherArgs, initClient } from "@ts-rest/core";
import { matchRoute } from "@__test__/routeContractMatch.ts";
import { tsRestClient as defaultPrivateTsRestClient } from "@api/tsRestClient.ts";
import { tsRestApiContracts } from "@shared/contracts/restContracts.ts";

export function privateTsRestClientBuilder(apps: AppCardProps[] = dummyApps) {
  return initClient(tsRestApiContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      if (!matchRoute(args, tsRestApiContracts.getUserDraftProjects)) {
        return {
          status: 404,
          body: { reason: "Not found" },
          headers: new Headers(),
        };
      }

      // Optionally filter by userId if needed
      return { status: 200, body: apps, headers: new Headers() };
    },
  }) as typeof defaultPrivateTsRestClient;
}

export function privateTsRestClientWithError() {
  return initClient(tsRestApiContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      if (!matchRoute(args, tsRestApiContracts.getUserDraftProjects)) {
        return {
          status: 404,
          body: { reason: "Not found" },
          headers: new Headers(),
        };
      }
      throw new Error("API error");
    },
  }) as typeof defaultPrivateTsRestClient;
}

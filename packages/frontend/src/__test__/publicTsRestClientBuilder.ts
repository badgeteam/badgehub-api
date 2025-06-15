// publicTsRestClientBuilder.ts
// Utility to build mock tsRestClient for tests

import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";
import type { AppCardProps } from "@sharedComponents/types.ts";
import { tsRestClient as defaultTsRestClient } from "@api/tsRestClient.ts";
import { dummyApps } from "./fixtures/dummyApps.ts";
import { matchRoute } from "@__test__/routeContractMatch.ts";
import { tsRestApiContracts } from "@shared/contracts/restContracts.ts";
import { ApiFetcherArgs, initClient } from "@ts-rest/core";

function parseProjectsQuery(rawQuery: unknown) {
  if (!rawQuery) return undefined;
  return getProjectsQuerySchema.parse(rawQuery);
}

const notFound = () => {
  return {
    status: 404,
    body: { reason: "Not found" },
    headers: new Headers(),
  };
};

export function tsRestClientWithApps(apps: AppCardProps[] = dummyApps) {
  const initClient1 = initClient(tsRestApiContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      // Handle getProject (by slug)
      const projectRouteMatch = matchRoute(args, tsRestApiContracts.getProject);
      if (projectRouteMatch) {
        const slug = projectRouteMatch?.get("slug");
        const app = apps.find((a) => a.slug === slug);
        if (!app) {
          return notFound();
        }
        return { status: 200, body: app, headers: new Headers() };
      } else if (matchRoute(args, tsRestApiContracts.getProjects)) {
        // Parse and validate query params using schema
        const parsedQuery = parseProjectsQuery(args.rawQuery);
        let filtered = apps;
        const device = parsedQuery?.device;
        const category = parsedQuery?.category;
        if (device) {
          filtered = filtered.filter(
            (app) =>
              app.badges &&
              app.badges.map((b) => b.toLowerCase()).includes(device)
          );
        }
        if (category) {
          filtered = filtered.filter(
            (app) => app.category?.toLowerCase() === category
          );
        }
        return { status: 200, body: filtered, headers: new Headers() };
      } else {
        return notFound();
      }
    },
  });
  return initClient1 as typeof defaultTsRestClient;
}

export function tsRestClientWithError() {
  return initClient(tsRestApiContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      if (!matchRoute(args, tsRestApiContracts.getProject)) {
        return notFound();
      }
      throw new Error("API error");
    },
  }) as typeof defaultTsRestClient;
}

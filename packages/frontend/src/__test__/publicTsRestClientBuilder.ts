import { getProjectsQuerySchema } from "@shared/contracts/publicRestContracts.ts";
import { tsRestClient as defaultTsRestClient } from "@api/tsRestClient.ts";
import { DummyApp, dummyApps } from "@__test__/fixtures";
import { matchRoute } from "@__test__/routeContractMatch.ts";
import { tsRestApiContracts } from "@shared/contracts/restContracts.ts";
import { ApiFetcherArgs, initClient } from "@ts-rest/core";
import { ProjectSummary } from "@shared/domain/readModels/project/ProjectDetails.ts";

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

export function tsRestClientWithApps(apps: DummyApp[] = dummyApps) {
  const initClient1 = initClient(tsRestApiContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      // Handle getProject (by slug)
      const projectRouteMatch = matchRoute(args, tsRestApiContracts.getProject);
      if (projectRouteMatch) {
        const slug = projectRouteMatch?.get("slug");
        const app = apps.find((a) => a.summary.slug === slug);
        if (!app) {
          return notFound();
        }
        return { status: 200, body: app.details, headers: new Headers() };
      } else if (matchRoute(args, tsRestApiContracts.getProjects)) {
        // Parse and validate query params using schema
        const parsedQuery = parseProjectsQuery(args.rawQuery);
        let filteredSummaries: ProjectSummary[] = apps.map(
          (dummyApp) => dummyApp.summary
        );
        const badgeSlug = parsedQuery?.badge;
        const category = parsedQuery?.category;
        if (badgeSlug) {
          filteredSummaries = filteredSummaries.filter(
            (app) =>
              app.badges &&
              app.badges.map((b) => b.toLowerCase()).includes(badgeSlug)
          );
        }
        if (category) {
          filteredSummaries = filteredSummaries.filter((app) =>
            app.categories?.includes(category)
          );
        }
        return { status: 200, body: filteredSummaries, headers: new Headers() };
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

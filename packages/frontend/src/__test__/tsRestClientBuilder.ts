// tsRestClientBuilder.ts
// Utility to build mock tsRestClient for App tests

import {
  publicProjectContracts,
  getProjectsQuerySchema,
} from "@shared/contracts/publicRestContracts.ts";
import { ApiFetcherArgs, initClient } from "@ts-rest/core";
import type { AppCardProps } from "@components/types.ts";
import { tsRestClient as defaultTsRestClient } from "@api/tsRestClient.ts";
import { dummyApps } from "./fixtures/dummyApps.ts";

function parseProjectsQuery(rawQuery: unknown) {
  if (!rawQuery) return undefined;
  return getProjectsQuerySchema.parse(rawQuery);
}

export function tsRestClientWithApps(apps: AppCardProps[] = dummyApps) {
  const initClient1 = initClient(publicProjectContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      // Handle getProject (by slug)
      if (args.path.match(/^\/projects\/[^/]+$/) && args.method === "GET") {
        const slug = args.path.split("/").pop();
        const app = apps.find((a) => a.slug === slug);
        if (app) {
          return { status: 200, body: app, headers: new Headers() };
        }
        return {
          status: 404,
          body: { reason: "Not found" },
          headers: new Headers(),
        };
      }
      if (args.path.match("/projects[^/]*") && args.method === "GET") {
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
            (app) => app.category.toLowerCase() === category
          );
        }
        return { status: 200, body: filtered, headers: new Headers() };
      }
      // fallback for other endpoints
      return {
        status: 404,
        body: { reason: "Not found" },
        headers: new Headers(),
      };
    },
  });
  return initClient1 as typeof defaultTsRestClient;
}

export function tsRestClientWithError() {
  return initClient(publicProjectContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      if (args.path === "/projects" && args.method === "GET") {
        throw new Error("API error");
      }
      return {
        status: 404,
        body: { reason: "Not found" },
        headers: new Headers(),
      };
    },
  }) as typeof defaultTsRestClient;
}

export function tsRestClientWithEmptyList() {
  return initClient(publicProjectContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      if (args.path === "/projects" && args.method === "GET") {
        return { status: 200, body: [], headers: new Headers() };
      }
      return {
        status: 404,
        body: { reason: "Not found" },
        headers: new Headers(),
      };
    },
  }) as typeof defaultTsRestClient;
}

// tsRestClientBuilder.ts
// Utility to build mock tsRestClient for App tests

import { publicProjectContracts } from "@shared/contracts/publicRestContracts";
import { ApiFetcherArgs, initClient } from "@ts-rest/core";
import type { AppCardProps } from "@components/types.ts";
import { tsRestClient as defaultTsRestClient } from "@api/tsRestClient.ts";

export const dummyApps: AppCardProps[] = [
  {
    slug: "dummy-app-1",
    name: "Dummy App 1",
    description: "A test app",
    category: "IoT",
    published_at: new Date(),
    revision: 1,
    badges: ["featured"],
  },
];

export function tsRestClientWithApps(apps: AppCardProps[]) {
  const initClient1 = initClient(publicProjectContracts, {
    baseUrl: "",
    api: async (args: ApiFetcherArgs) => {
      if (args.path === "/projects" && args.method === "GET") {
        return { status: 200, body: apps, headers: new Headers() };
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

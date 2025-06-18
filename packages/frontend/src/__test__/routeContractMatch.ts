import { privateRestContracts } from "@shared/contracts/privateRestContracts.ts";
import { publicRestContracts } from "@shared/contracts/publicRestContracts.ts";
import { ApiFetcherArgs } from "@ts-rest/core";
import { tsRestApiContracts } from "@shared/contracts/restContracts.ts";

function getPathValues(
  path: string,
  matcher: string
): Map<string, string> | undefined {
  const pathValues = new Map();
  // Normalize paths by ensuring they start with '/'
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedMatcher = matcher.startsWith("/") ? matcher : `/${matcher}`;

  // Split both paths by '/'
  const pathParts = normalizedPath.split("/").filter(Boolean);
  const matcherParts = normalizedMatcher.split("/").filter(Boolean);

  // If they have different lengths, they can't match
  if (pathParts.length !== matcherParts.length) {
    return undefined;
  }

  // Check each part
  for (let i = 0; i < pathParts.length; i++) {
    const matcherPart = matcherParts[i];
    const pathPart = pathParts[i];

    // If matcher part starts with ':' it's a parameter, so it matches anything
    if (matcherPart?.startsWith(":")) {
      pathValues.set(matcherPart.slice(1), pathPart);
      continue;
    }

    // Otherwise, the parts must be exactly equal
    if (matcherPart !== pathPart) {
      return undefined;
    }
  }

  return pathValues;
}

type ApiRoute = (typeof tsRestApiContracts)[keyof typeof tsRestApiContracts];

export const matchRoute = (args: ApiFetcherArgs, routeContract: ApiRoute) => {
  return (
    args.method === routeContract.method &&
    getPathValues(
      new URL(args.path, "http://localhost").pathname,
      routeContract.path
    )
  );
};

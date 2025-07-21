import {
  BADGE_WHY2025_ORG,
  BADGEHUB_P1M_NL,
} from "@shared/config/sharedConfig.ts";

export const REPO_URL = "https://github.com/badgehubcrew/badgehub-app";
export const BADGEHUB_FRONTEND_BASE_URL =
  globalThis.document?.location?.origin ?? "";
export const APP_GRID_PAGE_SIZE = 12;

export const getDeploymentId = () => {
  if (BADGEHUB_FRONTEND_BASE_URL.includes(BADGE_WHY2025_ORG)) {
    return BADGE_WHY2025_ORG;
  }
  return BADGEHUB_P1M_NL;
};

const getInstanceConfig = () => {
  // Todo move to file loaded at runtime
  const deploymentId = getDeploymentId();
  switch (deploymentId) {
    case BADGE_WHY2025_ORG:
      return {
        BADGEHUB_API_BASE_URL: "",
        KEYCLOAK_URL: BADGEHUB_FRONTEND_BASE_URL.replace("badge", "auth.badge"),
        KEYCLOAK_REALM: "master",
        KEYCLOAK_CLIENT_ID: "badgehub-api-frontend",
      } as const;
    default:
      return {
        BADGEHUB_API_BASE_URL: "",
        KEYCLOAK_URL: "https://keycloak.p1m.nl",
        KEYCLOAK_REALM: "master",
        KEYCLOAK_CLIENT_ID: "badgehub-api-frontend",
      } as const;
  }
};
const instanceConfig = getInstanceConfig();

export const BADGEHUB_API_BASE_URL = instanceConfig.BADGEHUB_API_BASE_URL;
export const KEYCLOAK_URL = instanceConfig.KEYCLOAK_URL;
export const KEYCLOAK_REALM = instanceConfig.KEYCLOAK_REALM;
export const KEYCLOAK_CLIENT_ID = instanceConfig.KEYCLOAK_CLIENT_ID;

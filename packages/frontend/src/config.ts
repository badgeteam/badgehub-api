export const REPO_URL = "https://github.com/badgehubcrew/badgehub-app";
export const BADGEHUB_FRONTEND_BASE_URL = document.location.origin;
export const APP_GRID_PAGE_SIZE = 12;

const getInstanceConfig = () => {
  // Todo move to file loaded at runtime
  if (BADGEHUB_FRONTEND_BASE_URL.includes("badge.why2025")) {
    return {
      BADGEHUB_API_BASE_URL: "",
      KEYCLOAK_URL: BADGEHUB_FRONTEND_BASE_URL.replace("badge", "auth.badge"),
      KEYCLOAK_REALM: "master",
      KEYCLOAK_CLIENT_ID: "badgehub-api-frontend",
    } as const;
  }
  return {
    BADGEHUB_API_BASE_URL: "",
    KEYCLOAK_URL: "https://keycloak.p1m.nl",
    KEYCLOAK_REALM: "master",
    KEYCLOAK_CLIENT_ID: "badgehub-api-frontend",
  } as const;
};
const instanceConfig = getInstanceConfig();

export const BADGEHUB_API_BASE_URL = instanceConfig.BADGEHUB_API_BASE_URL;
export const KEYCLOAK_URL = instanceConfig.KEYCLOAK_URL;
export const KEYCLOAK_REALM = instanceConfig.KEYCLOAK_REALM;
export const KEYCLOAK_CLIENT_ID = instanceConfig.KEYCLOAK_CLIENT_ID;

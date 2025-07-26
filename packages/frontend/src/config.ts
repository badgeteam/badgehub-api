import { getSharedConfig } from "@shared/config/sharedConfig.ts";

export const REPO_URL = "https://github.com/badgehubcrew/badgehub-app";
export const BADGEHUB_FRONTEND_BASE_URL =
  globalThis.document?.location?.origin ?? "";
export const APP_GRID_PAGE_SIZE = 12;

const sharedConfig = getSharedConfig();
export const BADGEHUB_API_BASE_URL = sharedConfig.badgeHubBaseUrl;
export const KEYCLOAK_URL = sharedConfig.keycloakIssuer.url;
export const KEYCLOAK_REALM = sharedConfig.keycloakIssuer.realm;
export const KEYCLOAK_CLIENT_ID = sharedConfig.keycloakIssuer.clientId;

export const REPO_URL = "https://github.com/badgeteam/badgehub-api";
export const BADGEHUB_API_BASE_URL = "";
interface Window {
  BADGEHUB_FRONTEND_BASE_URL?: string;
}
declare const window: Window;

export const BADGEHUB_FRONTEND_BASE_URL =
  window.BADGEHUB_FRONTEND_BASE_URL ?? "";

export const KEYCLOAK_URL = "https://keycloak.p1m.nl";
export const KEYCLOAK_REALM = "master";
export const KEYCLOAK_CLIENT_ID = "badgehub-api-frontend";
export const APP_GRID_PAGE_SIZE = 12;

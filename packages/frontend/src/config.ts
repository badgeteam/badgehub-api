export const REPO_URL = "https://github.com/badgeteam/badgehub-api";
export const BADGEHUB_API_BASE_URL = "";
interface Window {
  BADGEHUB_FRONTEND_BASE_URL?: string;
}
declare const window: Window;

export const BADGEHUB_FRONTEND_BASE_URL =
  window.BADGEHUB_FRONTEND_BASE_URL ?? "";

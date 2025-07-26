export type SharedConfig = {
  badges: string[];
  categories: string[];
  badgeHubBaseUrl: string;
  keycloakIssuer: {
    url: string;
    realm: string;
    clientId: string;
  };
};

export function getAndAssertEnv(envVarName: string) {
  const envVar = process.env[envVarName];
  if (envVar == null) {
    throw new Error(
      `Environment variable [${envVarName}] is not set and is required.`
    );
  }
  return envVar;
}

export const getSharedConfig = (): SharedConfig => {
  return (
    (globalThis as any).__SHARED_CONFIG__ ?? {
      keycloakIssuer: {
        url: URL.parse(getAndAssertEnv("KEYCLOAK_ISSUER"))?.origin,
        realm: getAndAssertEnv("KEYCLOAK_ISSUER").split("/").at(-1),
        clientId: process.env.KEYCLOAK_CLIENT_ID ?? "badgehub-api-frontend",
      },
      badgeHubBaseUrl: getAndAssertEnv("BADGEHUB_API_BASE_URL"),
      badges: getAndAssertEnv("BADGE_SLUGS")?.split(","),
      categories: getAndAssertEnv("CATEGORY_NAMES")?.split(","),
    }
  );
};

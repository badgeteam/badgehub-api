import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

config();
export const EXPRESS_PORT = 8081;

function getAndAssertEnv(envVarName: string) {
  const envVar = process.env[envVarName];
  if (envVar == null) {
    throw new Error(
      `Environment variable [${envVarName}] is not set and is required.`
    );
  }
  return envVar;
}

export const POSTGRES_DB = getAndAssertEnv("POSTGRES_DB");
console.log(`Using database: ${POSTGRES_DB}`);
export const POSTGRES_USER = getAndAssertEnv("POSTGRES_USER");
export const POSTGRES_PASSWORD = getAndAssertEnv("POSTGRES_PASSWORD");
export const POSTGRES_HOST = getAndAssertEnv("POSTGRES_HOST");
export const POSTGRES_PORT = 5432;
export const IS_DEV_ENV = process.env.NODE_ENV === "development";
export const DISABLE_AUTH = process.env.DISABLE_AUTH === "true";
export const MAX_UPLOAD_FILE_SIZE_BYTES = 32 * 1024 * 1024; // 32 MB
export const KEYCLOAK_ISSUER = getAndAssertEnv("KEYCLOAK_ISSUER");
export const KEYCLOAK_CERTS =
  KEYCLOAK_ISSUER + "/protocol/openid-connect/certs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const PUBLIC_STATIC_FILE_DIR = path.resolve(
  __dirname,
  "../../frontend/dist"
);

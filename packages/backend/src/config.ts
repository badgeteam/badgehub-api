import { config } from "dotenv";

config();
export const EXPRESS_PORT = 8081;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = 5432;
export const NODE_ENV = process.env.NODE_ENV;
export const DISABLE_AUTH = process.env.DISABLE_AUTH === "true";
export const MAX_UPLOAD_FILE_SIZE_BYTES = 32 * 1024 * 1024; // 32 MB
export const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER;
export const KEYCLOAK_CERTS =
  KEYCLOAK_ISSUER + "/protocol/openid-connect/certs";

import { config } from "dotenv";

config();
export const EXPRESS_PORT = 8081;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_HOST = process.env.DB_HOST;
export const POSTGRES_PORT = 5432;

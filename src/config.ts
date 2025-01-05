import { config } from "dotenv";
import * as path from "node:path";

config();
export const EXPRESS_PORT = 8081;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_HOST = process.env.DB_HOST;
export const POSTGRES_PORT = 5432;
export const NODE_ENV = process.env.NODE_ENV;
export const DATA_DIR = process.env.DATA_DIR || "data";

import pg from "pg";

let pool: pg.Pool;
export const getPool = () => {
  if (!pool) {
    pool = new pg.Pool({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });
  }
  return pool;
};

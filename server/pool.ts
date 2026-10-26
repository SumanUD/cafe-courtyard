import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT || 5432),
        database: process.env.PGDATABASE || "cafe_courtyard",
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD,
      },
);

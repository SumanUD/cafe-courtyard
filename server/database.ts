import "dotenv/config";
import { readFile } from "node:fs/promises";
import { seedInitialContent } from "./seed-data.js";
import { pool } from "./pool.js";

export { pool };

export async function initializeDatabase() {
  const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
  await pool.query(schema);
  await seedInitialContent();
}

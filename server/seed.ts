import "dotenv/config";
import { initializeDatabase } from "./database.js";
import { pool } from "./pool.js";

initializeDatabase()
  .then(async () => {
    console.log("Database schema and initial content are ready.");
    await pool.end();
  })
  .catch(async (error: unknown) => {
    console.error("Database initialization failed:", error);
    await pool.end();
    process.exitCode = 1;
  });

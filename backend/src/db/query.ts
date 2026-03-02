import { pool } from "./index";

export async function query(text: string, params?: any[]) {
  const start = Date.now();

  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log("Executed query", { text, duration });

    return res;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}

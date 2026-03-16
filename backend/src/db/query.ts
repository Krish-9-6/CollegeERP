import { pool } from "./index";

export async function query(text: string, params?: any[], req?: Request) {
  const start = Date.now();

  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (req) {
      console.log("Executed", req, "query", {
        text,
        duration,
      });
    } else {
      console.log("Executed", "query", {
        text,
        duration,
      });
    }

    return res;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}

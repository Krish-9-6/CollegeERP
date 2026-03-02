import app from "./app";
import { pool } from "./db";

const PORT = 5000;

async function startServer() {
  try {
    await pool.query("select 1");
    console.log("database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    app.get("/", async (req, res) => {
      const result = await pool.query("select now()");
      res.json({ "time currently": result.rows[0].now });
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();

import app from "./app";
import { pool } from "./db";
import { query } from "./db/query";

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
      console.log(req.method);
    });

    app.get("/bitch", async (req, res) => {
      const result = await query("select email from users");
      res.json({ bitch: result.rows[0].email });
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();

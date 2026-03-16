import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./module/auth/auth.route";

// load environment variables early; other modules also call dotenv, but
// doing it here ensures configuration errors are caught on startup.
dotenv.config();

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

export default app;

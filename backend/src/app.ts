import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

// load environment variables early; other modules also call dotenv, but
// doing it here ensures configuration errors are caught on startup.
dotenv.config();

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL (Vite default)
    credentials: true, // ← CRITICAL: allows cookies to be sent cross-origin
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

export default app;

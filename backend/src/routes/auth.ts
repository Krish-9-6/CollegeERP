import express, { Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../middleware/auth";
import { query } from "../db/query";

const router = express.Router();

interface User {
  id: number;
  email: string;
  password?: string;
  role?: string;
}

const generateTokens = (user: User) => {
  const payload = { id: user.id, email: user.email };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const setRefreshCookie = async (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query(
      "SELECT id, email, password, role FROM users WHERE email = $1",
      [email],
    );

    const user = result.rows[0];
    const dummyHash =
      "$2b$12$invalidhashfortimingattackprevention000000000000000000";
    const valid = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, dummyHash);

    if (!user || !valid)
      return res.status(401).json({ message: "Invalid credentials" });
    const { accessToken, refreshToken } = generateTokens(user);
    await storeRefreshToken(user.id, refreshToken);
    await setRefreshCookie(res, refreshToken);

    res.json({ accessToken, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    // Check token exists in DB and isn't expired
    const result = await query(
      `SELECT rt.user_id, rt.expires_at, u.email
       FROM refresh_tokens rt
       JOIN users u ON u.id = rt.user_id
       WHERE rt.token = $1`,
      [token],
    );

    const row = result.rows[0];
    console.log("row", row);
    if (!row) return res.status(403).json({ message: "Refresh token revoked" });

    // 📖 CONCEPT: Check expiry in DB as a second layer of validation,
    // even though JWT.verify() also checks it.
    if (new Date(row.expires_at) < new Date()) {
      await query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
      return res.status(403).json({ message: "Refresh token expired" });
    }

    // Verify JWT signature
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as JwtPayload;
    const user = { id: decoded.id, email: decoded.email };

    // Rotate: delete old token, store new one
    await query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    await storeRefreshToken(user.id, newRefreshToken);
    await setRefreshCookie(res, newRefreshToken);

    res.json({ accessToken, user });
  } catch (err) {
    // JWT verification failed — clean up and reject
    console.error(err);
    await query("DELETE FROM refresh_tokens WHERE token = $1", [token]).catch(
      () => {},
    );
    res.clearCookie("refreshToken");
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
  }
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

async function storeRefreshToken(userId: number, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  await query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
    [userId, token, expiresAt],
  );
  console.log("userId", userId);
  console.log("token", token);
}

export default router;

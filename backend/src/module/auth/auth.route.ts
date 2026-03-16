import { Router } from "express";
import { login } from "./auth.controller";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic request validation before calling controller
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const token = await login(email, password);

    res.json({ token });
  } catch (error) {
    // hide internal errors from clients
    res.status(401).json({
      message: "Invalid email or password",
    });
    throw error;
  }
});

export default router;

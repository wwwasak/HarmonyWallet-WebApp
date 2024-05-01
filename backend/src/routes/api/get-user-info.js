import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    const userInfo = {
      username: user.username,
      base_currency: user.base_currency,
    };
    res.status.json(userInfo);
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

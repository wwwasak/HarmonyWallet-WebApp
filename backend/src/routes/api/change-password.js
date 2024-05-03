import express from "express";
import User from "../../models/user-schema.js";
import bcrypt from "bcryptjs";
import { authenticateToken } from "../../middleware/authenticateToken.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { password } = req.body;
  const userId = req.user.userId;

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (result) {
      return res.status(200).send({ message: "Password updated successfully" });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Failed to update password:", error);
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

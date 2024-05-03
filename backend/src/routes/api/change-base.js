import express from "express";
import User from "../../models/user-schema.js";
import { authenticateToken } from "../../middleware/authenticateToken.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { base_currency } = req.body;
  const userId = req.user.userId;

  try {
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { base_currency: base_currency } },
      { new: true }
    );

    if (result) {
      return res
        .status(200)
        .send({
          message: "Base currency updated successfully",
          baseCurrency: result.base_currency,
        });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Failed to update base currency:", error);
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

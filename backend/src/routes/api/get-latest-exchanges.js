import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import Exchange from "../../models/exchange-schema.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/:day", authenticateToken, async (req, res) => {
  const { day } = req.params;
  try {
    const userId = req.user.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    let exchanges;

    if (day == "n") {
      exchanges = await Exchange.find({ user: userId });
    } else {
      const numbersOfDays = parseInt(day, 10);
      if (isNaN(numbersOfDays)) {
        return res.status(400).send("Invalid day params");
      }

      exchanges = await Exchange.find({ user: userId }).limit(numbersOfDays);
    }

    res.status.json(exchanges);
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

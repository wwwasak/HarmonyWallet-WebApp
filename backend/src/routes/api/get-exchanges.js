import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import Exchange from "../../models/exchange-schema.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { day } = req.body;

  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    let exchanges;
    const populateQuery = [
      { path: "fromCurrency", select: "currency" },
      { path: "toCurrency", select: "currency" },
    ];

    if (day == "n") {
      exchanges = await Exchange.find({ user: userId }).populate(populateQuery);
    } else {
      const numbersOfDays = parseInt(day, 10);
      if (isNaN(numbersOfDays)) {
        return res.status(400).send("Invalid day params");
      }

      exchanges = await Exchange.find({ user: userId })
        .populate(populateQuery)
        .limit(numbersOfDays);
    }

    const filteredExchanges = exchanges.map((expense) => ({
      date: expense.date,
      fromAmount: expense.fromAmount,
      fromCurrency: expense.fromCurrency.currency,
      toAmount: expense.toAmount,
      toCurrency: expense.toCurrency.currency,
    }));

    res.status(200).json(filteredExchanges);
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import Exchange from "../../models/exchange-schema.js";
import { parseISO, format } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { fromDate } = req.body;

  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!fromDate) {
      return res.status(400).send({ messgae: "fromDate is required" });
    }

    const parsedDate = parseISO(fromDate);

    const exchanges = await Exchange.find({
      user: userId,
      date: { $gte: parsedDate },
    }).populate([
      { path: "fromCurrency", select: "currency" },
      { path: "toCurrency", select: "currency" },
    ]);

    const filteredExchanges = exchanges.map((exchange) => ({
      date: exchange.date,
      fromAmount: exchange.fromAmount.toFixed(2),
      fromCurrency: exchange.fromCurrency.currency,
      toAmount: exchange.toAmount.toFixed(2),
      toCurrency: exchange.toCurrency.currency,
    }));

    res.status(200).json(filteredExchanges);
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import Income from "../../models/income-schema.js";
import Expense from "../../models/expense-schema.js";
import Currency from "../../models/currency-schema.js";
import Exchange from "../../models/exchange-schema.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { date, type, amount, unit, fromAmount, fromUnit, toAmount, toUnit } =
    req.body;

  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (type == "Income" || type == "Expense") {
      const currency = await Currency.findOne({ currency: unit });
      if (!currency)
        return res.status(404).send({ message: "Currency not found" });

      const record =
        type == "Income"
          ? new Income({
              user: userId,
              date,
              amount,
              currency: currency._id,
            })
          : new Expense({
              user: userId,
              date,
              amount,
              currency: currency._id,
            });

      await record.save();
      res.status(201).send({
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} recorded successfully.`,
      });
    } else if (type == "Exchange") {
      const fromCurrency = await Currency.findOne({ currency: fromUnit });
      const toCurrency = await Currency.findOne({ currency: toUnit });

      if (!fromCurrency || !toCurrency)
        return res
          .status(404)
          .send({ message: "One or more currencies not found" });
      const newExchange = new Exchange({
        user: userId,
        date,
        fromAmount,
        fromCurrency: fromCurrency._id,
        toAmount,
        toCurrency: toCurrency._id,
      });
      await newExchange.save();
      res.status(201).send("Exchange recorded successfully.");
    } else {
      res.status(400).send("Invalid type specified");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

export default router;

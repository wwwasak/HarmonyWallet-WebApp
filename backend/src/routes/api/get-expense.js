import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import Currency from "../../models/currency-schema.js";
import Expense from "../../models/expense-schema.js";
import Income from "../../models/income-schema.js";
import { getExchangeRate } from "../../services/getExchangeRate.js";
import { parseISO } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { fromDate, currency } = req.body;
  const upperCasedCurrency = currency.toUpperCase();

  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const currencyData = await Currency.findOne({
      currency: upperCasedCurrency,
    });

    if (!currencyData)
      return res.status(404).send({ message: "Currency is invalid" });

    if (!fromDate) {
      return res.status(400).send({ messgae: "fromDate is required" });
    }

    const fromDateObj = parseISO(fromDate);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: fromDateObj },
    }).populate({ path: "currency", select: "currency" });

    const convertedExpenses = await Promise.all(
      expenses.map(async (expense) => {
        const rate = await getExchangeRate(
          expense.currency.currency,
          upperCasedCurrency,
          expense.date
        );
        return {
          ...expense._doc,
          convertedAmount: expense.amount * rate,
          convertedCurrency: upperCasedCurrency,
        };
      })
    );

    res.status(200).json(convertedExpenses);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

export default router;

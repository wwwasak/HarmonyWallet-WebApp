import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
import Income from "../../models/income-schema.js";
import Expense from "../../models/expense-schema.js";
import Currency from "../../models/currency-schema.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { date, type, amount, currency: currencyCode } = req.body;
  console.log(req.body);

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    const currency = await Currency.findOne({ currency: currencyCode });
    if (!currency)
      return res.status(404).send({ message: "Currency not found" });

    if (type === "income") {
      const newIncome = new Income({
        user: user._id,
        date,
        amount,
        currency: currency._id,
      });
      await newIncome.save();
      res.status(201).send({ message: "Income recorded successfully." });
    } else if (type === "expense") {
      const newExpense = new Expense({
        user: user._id,
        date,
        amount,
        currency: currency._id,
      });
      await newExpense.save();
      res.status(201).send({ message: "Expense recorded successfully." });
    } else {
      res.status(400).send({ message: "Invalid type specified" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

export default router;

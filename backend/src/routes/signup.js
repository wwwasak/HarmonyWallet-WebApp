import express from "express";
import User from "../models/user-schema.js";
import bcrypt from "bcryptjs";
import Currency from "../models/currency-schema.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    username,
    password,
    security_question,
    question_answer,
    base_currency,
    notification,
    favourite_currency,
  } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).send({ message: "Username already exists" });
    }

    const currencyObject = await Currency.findOne({ currency: base_currency });
    if (!currencyObject) {
      return res.status(404).json({ message: "Base currency not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
      security_question: security_question,
      question_answer: question_answer,
      base_currency: currencyObject._id,
      notification: notification,
      favourite_currency: favourite_currency,
    });

    await user.save();

    res.status(201).send("create successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;

import express from "express";
import User from "../models/user-schema.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    username,
    password,
    security_question,
    auestion_answer,
    default_currency,
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
      security_question: security_question,
      auestion_answer: auestion_answer,
      default_currency: default_currency,
      notification: notification,
      favourite_currency: favourite_currency,
    });

    console.log(user);

    await user.save();

    res.status(201).send("create successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;

import express from "express";
import User from "../models/user-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).send("Username or Password is not correct");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: "24h" }
      );

      res.status(200).send({ message: "Login successfully", token: token });
    } else {
      res.status(401).send("Username or Password is not correct");
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).send("Server error");
  }
});

export default router;

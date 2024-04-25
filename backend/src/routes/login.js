import express from "express";
import User from "../models/user-schema.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send("Login successfully");
    } else {
      res.status(401).send("Username or Password is not correct");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;

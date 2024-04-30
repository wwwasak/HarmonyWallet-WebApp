import express from "express";
import User from "../../models/user-schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }

  try {
    const selectedUser = await User.findOne({ username });
    if (selectedUser) {
      return res.status(409).send({ message: "Username already exists" });
    } else {
      return res.status(200).send({ message: "Username is available" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

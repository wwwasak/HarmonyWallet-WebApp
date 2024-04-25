import express from "express";
import User from "../../models/user-schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, security_question, question_answer } = req.body;

  if (!username || !security_question || !question_answer) {
    return res.status(400).send({ message: "Info is required" });
  }

  try {
    const selectedUser = await User.findOne({
      username,
      security_question,
      question_answer,
    });
    if (selectedUser) {
      return res.status(200).send({ message: "Info matches" });
    } else {
      return res.status(409).send({ message: "Info does not match" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

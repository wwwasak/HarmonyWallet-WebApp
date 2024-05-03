import express from "express";
import User from "../../models/user-schema.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, security_question, question_answer } = req.body;

  try {
    const user = await User.findOne({
      username: username,
      security_question: security_question,
      question_answer: question_answer,
    });
    if (!user) {
      return res.status(401).send({ message: "Security info does not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (result) {
      return res.status(200).send({ message: "Password updated successfully" });
    } else {
      return res.status(400).send({ message: "Password update failed" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

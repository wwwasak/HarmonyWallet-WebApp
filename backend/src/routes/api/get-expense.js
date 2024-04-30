import express from "express";
import User from "../../models/user-schema";
// import Expense from "../../models/expense-schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const period = req.params;
  const { username } = req.body.username;

  try {
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(401).send({ message: "User does not exists" });
    }

    //   const result = await User.findOneAndUpdate(
    //     { _id: user._id },
    //     { $set: { password: hashedPassword } },
    //     { new: true }
    //   );

    //   if (result) {
    //     return res.status(200).send({ message: "Password updated successfully" });
    //   } else {
    //     return res.status(400).send({ message: "Password update failed" });
    //   }
  } catch (error) {
    //   return res.status(500).send({ message: "Server error" });
  }
});

export default router;

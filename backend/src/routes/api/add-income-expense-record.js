import express from "express";
import User from "../../models/user-schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { date, type, amount, currency } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(401).send({ message: "No user exists" });
    }

    const result = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { base_currency: base_currency } },
      { new: true }
    );

    if (result) {
      return res
        .status(200)
        .send({ message: "Base currency updated successfully" });
    } else {
      return res.status(400).send({ message: "Base currency update failed" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;

import express from "express";
import Currency from "../../models/currency-schema.js";
import { authenticateToken } from "../../middleware/authenticateToken.js";
import User from "../../models/user-schema.js";
const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { base_currency_code } = req.body;
  const userId = req.user.userId;

  try {
    const currency = await Currency.findOne({ currency: base_currency_code });
    if (!currency) {
      return res.status(404).send({ message: "Currency not found" });
    }
    const updatedCurrencyObject = await User.findByIdAndUpdate(
        userId,
        { $set: { base_currency: currency._id } },
        { new: true }
    ).populate('base_currency');    
   
    console.log("Base currency updated to:", updatedCurrencyObject.base_currency);
    
    if (updatedCurrencyObject) {
      return res
        .status(200)
        .send({
          // message: "Base currency updated successfully",
          base_currency: updatedCurrencyObject.base_currency.currency,
        });
    } else {
      return res.status(404).send({ message: "Base currency not found" });
    }
  } catch (error) {
    console.error("Failed to update base currency:", error);
    return res.status(500).send({ message: "Server error" });
  }

});

export default router;
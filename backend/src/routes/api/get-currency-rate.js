import express from "express";
import User from "../../models/user-schema.js";
import Currency from "../../models/currency-schema.js";
import { CURRENCIES } from "../../db/CURRENCIES.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { fromDate, currency } = req.query;

  if (!CURRENCIES.includes(currency)) {
    return res.status(400).send({ message: "Invalid currency code." });
  }

  try {
    const currencyData = await Currency.findOne({ currency: currency });
    if (!currencyData) {
      return res.status(404).send({ message: "Currency data not found." });
    }

    res.status(200).json(currencyData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Server error while retrieving currency data." });
  }

  console.log(req.query);
});

export default router;

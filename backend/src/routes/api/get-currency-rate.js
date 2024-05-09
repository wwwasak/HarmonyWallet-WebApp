import express from "express";
import Currency from "../../models/currency-schema.js";
import { CURRENCIES } from "../../db/CURRENCIES.js";
import { format } from "date-fns";

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

    if (!fromDate) {
      return res.status(400).json({ message: "From date is required." });
    }

    const fromDateObj = new Date(fromDate);
    const startDate = new Date(currencyData.start_date);
    const endDate = new Date(currencyData.end_date);

    if (fromDateObj < startDate || fromDateObj > endDate) {
      return res
        .status(400)
        .json({ message: "From date is out of the range." });
    }

    const today = format(new Date(), "yyyy-MM-dd");
    const filteredRates = new Map();

    currencyData.rates.forEach((value, key) => {
      if (key >= fromDate && key <= today) {
        filteredRates.set(key, value);
      }
    });

    const ratesObject = Object.fromEntries(filteredRates);

    res.status(200).json({
      currency: currencyData.currency,
      rates: ratesObject,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Server error while retrieving currency data." });
  }
});

export default router;

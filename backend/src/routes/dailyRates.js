const express = require("express");
const router = express.Router();
const DailyRate = require("../models/DailyRate");

router.get("/", async (req, res) => {
  const dailyRates = await DailyRate.find();
  res.send(dailyRates);
});

router.get("/:date/:baseCurrency/:targetCurrency", async (req, res) => {
  const { date, baseCurrency, targetCurrency } = req.params;

  const dailyRateEntry = await DailyRate.findOne({
    date: date,
    base: baseCurrency,
  });

  const rateForTargetCurrency = dailyRateEntry.rates.get(targetCurrency);

  res.json({ date, baseCurrency, targetCurrency, rate: rateForTargetCurrency });
});

module.exports = router;

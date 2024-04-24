import express from "express";
const router = express.Router();
import DailyRate from "../../models/DailyRate.js";

//wait for fetching data
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

export default router;

import {
  eachDayOfInterval,
  format,
  addDays,
  startOfDay,
  addHours,
} from "date-fns";
import Currency from "../models/currency-schema.js";

async function fillMissingRates() {
  try {
    const currencies = await Currency.find();
    const today = startOfDay(new Date());

    const updatePromises = currencies.map(async (currency) => {
      const { start_date, rates } = currency;
      let end_date = currency.end_date;

      if (end_date < today) {
        end_date = today;
      }

      const dateRange = eachDayOfInterval({
        start: start_date,
        end: end_date,
      });

      let lastAvailableRate = {};
      let isUpdated = false;

      for (const date of dateRange) {
        const dateString = format(date, "yyyy-MM-dd");
        if (!rates.get(dateString) && lastAvailableRate) {
          rates.set(dateString, lastAvailableRate);
          isUpdated = true;
        } else if (rates.get(dateString)) {
          lastAvailableRate = rates.get(dateString);
        }
      }

      if (isUpdated) {
        currency.end_date = addHours(end_date, 12);
        return currency.save();
      }
    });

    await Promise.all(updatePromises);
    console.log("All currencies updated.");
  } catch (error) {
    console.error("Error updating currency rates:", error);
  }
}

export { fillMissingRates };

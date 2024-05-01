import { eachDayOfInterval, format, addDays } from "date-fns";
import Currency from "../models/currency-schema.js";

async function fillMissingRates() {
  try {
    const currencies = await Currency.find();

    const updatePromises = currencies.map(async (currency) => {
      const { start_date, end_date, rates } = currency;
      const extendedEndDate = addDays(end_date, 1);
      const dateRange = eachDayOfInterval({
        start: start_date,
        end: extendedEndDate,
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
        currency.end_date = extendedEndDate;
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

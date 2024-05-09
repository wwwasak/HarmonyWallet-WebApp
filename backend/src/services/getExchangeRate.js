import Currency from "../models/currency-schema.js";
import { format, parseISO } from "date-fns";

async function getExchangeRate(fromCurrency, toCurrency, date) {
  const upperCasedFromCurrency = fromCurrency.toUpperCase();

  const upperCasedToCurrency = toCurrency.toUpperCase();

  const formattedDate = format(date, "yyyy-MM-dd");

  if (upperCasedFromCurrency == upperCasedToCurrency) {
    return 1;
  }

  try {
    const currencyData = await Currency.findOne({
      currency: upperCasedFromCurrency,
      start_date: { $lte: date },
      // end_date: { $gte: date },
    });

    if (!currencyData) {
      throw new Error(
        "No currency data available for the specified date and currency."
      );
    }
    const rateData = currencyData.rates.get(formattedDate);

    if (!rateData) {
      throw new Error(
        "No exchange rate data available for the specified date."
      );
    }

    const exchangeRate = rateData[upperCasedToCurrency];

    if (!exchangeRate) {
      throw new Error(
        `No exchange rate data available for currency ${toCurrency} on ${formattedDate}.`
      );
    }

    return exchangeRate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
}

export { getExchangeRate };

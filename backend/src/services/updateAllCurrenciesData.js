import axios from "axios";
import { CURRENCIES } from "../db/CURRENCIES.js";
import Currency from "../models/currency-schema.js";
import { format, subDays, parseISO, differenceInDays } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.RELATED_CURRENCY_STRING;

async function fetchCurrency(currency, fromDate, toDate) {
  const url = `${API_BASE_URL}${fromDate}..?from=${currency}&to=${currency}`;
  const response = await axios.get(url);
  return response.data;
}

async function updateCurrencyData(currency) {
  try {
    const latestCurrencyData = await Currency.findOne({ currency }).sort({
      start_date: -1,
    });
    const latestEndDate = latestCurrencyData
      ? latestCurrencyData.end_date
      : null;

    if (!latestEndDate) {
      console.error(`No existing data found for currency: ${currency}`);
      return;
    }

    const today = new Date();
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    if (endDate <= latestEndDate) {
      console.log(`Currency data for ${currency} is already up to date.`);
      return;
    }

    const fromDate = format(subDays(latestEndDate, 1), "yyyy-MM-dd");
    const toDate = format(endDate, "yyyy-MM-dd");

    const newData = await fetchCurrency(currency, fromDate, toDate);
    if (!newData) {
      console.error(`Failed to fetch data for currency: ${currency}`);
      return;
    }

    const updatedRates = new Map(Object.entries(newData.rates));
    const update = {
      $push: {
        rates: {
          $each: Array.from(updatedRates),
          $sort: { 0: 1 },
        },
      },
      $set: {
        end_date: toDate,
      },
    };

    await Currency.updateOne({ currency }, update);
    console.log(`Currency data for ${currency} updated successfully.`);
  } catch (error) {
    console.error(`Failed to update currency data for ${currency}:`, error);
  }
}

async function updateAllCurrenciesData() {
  try {
    for (const currency of CURRENCIES) {
      await updateCurrencyData(currency);
    }
    console.log("All currencies data updated successfully.");
  } catch (error) {
    console.error("Failed to update all currencies data:", error);
  }
}

export { updateAllCurrenciesData };

import axios from "axios";
import { CURRENCIES } from "../db/CURRENCIES.js";
import Currency from "../models/currency-schema.js";
import { format, subDays } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.RELATED_CURRENCY_STRING;
const fromDate = getSevenDaysAgoFormatted();

function getSevenDaysAgoFormatted() {
  const sevenDaysAgo = subDays(new Date(), 7);
  return format(sevenDaysAgo, "yyyy-MM-dd");
}

async function fetchCurrency(currency) {
  const url = `${API_BASE_URL}${fromDate}..?from=${currency}`;
  const response = await axios.get(url);
  return response.data;
}

async function initCurrencyDatabase() {
  try {
    for (const currency of CURRENCIES) {
      const data = await fetchCurrency(currency);

      const newCurrencyData = new Currency({
        currency,
        amount: data.amount,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        rates: data.rates,
      });

      await newCurrencyData.save();
    }
    console.log("Currency data initialized successfully.");
  } catch (error) {
    console.error("Failed to fetch or save currency data:", error);
    throw error;
  }
}

export { initCurrencyDatabase };

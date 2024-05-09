import axios from "axios";
import { CURRENCIES } from "../db/CURRENCIES.js";
import Currency from "../models/currency-schema.js";
import { format, subDays, parseISO } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.RELATED_CURRENCY_STRING;
const fromDate = getNDaysAgoFormatted(365);

function getNDaysAgoFormatted(n) {
  const nDaysAgo = subDays(new Date(), n);
  return format(nDaysAgo, "yyyy-MM-dd");
}

async function fetchCurrency(currency) {
  const url = `${API_BASE_URL}${fromDate}..?from=${currency}`;
  const response = await axios.get(url);
  return response.data;
}

async function fetchAllCurrencies() {
  const promises = CURRENCIES.map((currency) => fetchCurrency(currency));
  return Promise.all(promises);
}

async function initCurrencyDatabase() {
  try {
    const results = await fetchAllCurrencies();
    const currenciesData = results.map((data, index) => ({
      currency: CURRENCIES[index],
      amount: data.amount,
      start_date: parseISO(data.start_date),
      end_date: parseISO(data.end_date),
      rates: data.rates,
    }));

    await Currency.insertMany(currenciesData);
    console.log("Currency data initialized successfully.");
  } catch (error) {
    console.error("Failed to fetch or save currency data:", error);
    throw error;
  }
}

export { initCurrencyDatabase };

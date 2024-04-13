const { API_KEY } = require("../utils/API_KEY");
const axios = require("axios");
const DailyRate = require("../models/DailyRate");

const fetchDailyRate = async (date, base) => {
  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/historical/${date}.json?app_id=${API_KEY}&base=${base}`
    );

    const { data } = response;

    await DailyRate.create({
      date,
      base,
      rates: data.rates,
    });

    console.log(`Historical rates data for ${date} saved to MongoDB`);
  } catch (error) {
    console.error(
      `Error fetching historical rates for ${date}:`,
      error.message
    );
  }
};

exports.fetchAndStoreHistoricalRates = async () => {
  try {
    const startDate = new Date("2024-03-01");
    const endDate = new Date("2024-03-31");
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      await fetchDailyRate(formattedDate, "USD");
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      message:
        "Historical rates data for March fetched and stored successfully",
    };
  } catch (error) {
    throw new Error(
      `Error fetching historical rates for the March: ${error.message}`
    );
  }
};

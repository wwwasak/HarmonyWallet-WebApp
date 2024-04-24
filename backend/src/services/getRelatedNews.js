import axios from "axios";
import { getOneWeekAgoFormatted } from "./getCurrentDate.js";

async function getRelatedNews(targetCurrency) {
  const API_BASE_URL = process.env.RELATED_NEWS_STRING;
  const fromDate = getOneWeekAgoFormatted();
  const apiKey = process.env.RELATED_NEWS_APIKEY_STRING;

  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        function: "NEWS_SENTIMENT",
        apikey: apiKey,
        tickers: `FOREX:${targetCurrency}`,
        time_from: fromDate,
      },
    });

    const extractedData = response.data.feed.map((article) => ({
      title: article.title,
      url: article.url,
      time_published: article.time_published,
    }));
    return extractedData; //format: [{title:String,url:String,time_published:String}]
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
}

export { getRelatedNews };

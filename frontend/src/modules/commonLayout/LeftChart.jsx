import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LineChart from "../charts/CommonLineChart";
import { parseISO, format } from "date-fns";

export default function LeftIncomeChart({ datePeriod }) {
  const [xAxis, setXAxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (datePeriod && datePeriod.length > 0) {
      const dateAmountMap = {};
      datePeriod.forEach((item) => {
        const date = format(item.date, "yyyy-MM-dd");
        const amount = item.convertedAmount;
        if (dateAmountMap[date]) {
          dateAmountMap[date] += amount;
        } else {
          dateAmountMap[date] = amount;
        }
      });

      const sortedDates = Object.keys(dateAmountMap).sort();
      const dates = sortedDates.map((date) =>
        format(parseISO(date), "yyyy-MM-dd")
      );
      const amounts = sortedDates.map((date) => dateAmountMap[date].toFixed(2));

      setXAxis(dates);
      setSeriesData(amounts);
    }
  }, [datePeriod]);

  return (
    <Box>
      <LineChart xAxis={xAxis} seriesData={seriesData} />
    </Box>
  );
}

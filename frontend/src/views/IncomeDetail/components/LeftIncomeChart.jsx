import { Box } from "@chakra-ui/react";
import DefaultIncomeLineChart from "./DefaultIncomeLineChart";
import LineChartComponent from "../../../modules/charts/LineChartComponent";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
import { parseISO, format } from "date-fns";

export default function LeftIncomeChart({ datePeriod }) {
  const [xAxis, setXAxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  console.log(datePeriod);

  useEffect(() => {
    if (datePeriod && datePeriod.length > 0) {
      const sortedData = [...datePeriod].sort((a, b) => b.date - a.date);
      const dates = sortedData.map((item) => format(item.date, "yyyy-MM-dd"));
      const amounts = sortedData.map((item) => item.convertedAmount);

      setXAxis(dates.reverse());
      setSeriesData(amounts.reverse());
    }
  }, [datePeriod]);

  // useEffect(() => {
  //   if (datePeriod && datePeriod.length > 0) {
  //     const dateAmountMap = {};
  //     datePeriod.forEach((item) => {
  //       console.log(item);
  //       const date = format(item.date, "yyyy-MM-dd");
  //       const amount = item.convertedAmount;
  //       if (dateAmountMap[date]) {
  //         dateAmountMap[date] += amount;
  //       } else {
  //         dateAmountMap[date] = amount;
  //       }
  //     });

  //     const sortedDates = Object.keys(dateAmountMap).sort();
  //     const dates = sortedDates.map((date) =>
  //       format(parseISO(date), "yyyy-MM-dd")
  //     );
  //     const amounts = sortedDates.map((date) => dateAmountMap[date]);

  //     setXAxis(dates);
  //     setSeriesData(amounts);
  //   }
  // }, [datePeriod]);

  return (
    <Box>
      <LineChart xAxis={xAxis} seriesData={seriesData} />
    </Box>
  );
}

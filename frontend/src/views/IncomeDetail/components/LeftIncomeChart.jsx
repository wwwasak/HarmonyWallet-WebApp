import { Box } from "@chakra-ui/react";
import DefaultIncomeLineChart from "./DefaultIncomeLineChart";
import LineChartComponent from "../../../modules/charts/LineChartComponent";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";

export default function LeftIncomeChart({ datePeriod, currency }) {
  const [xAxis, setXAxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  console.log(datePeriod);

  useEffect(() => {
    if (datePeriod && datePeriod.length > 0) {
      //console.log(datePeriod.length);
      datePeriod.map((item) => {
        setXAxis([...xAxis, item.date]);
        setSeriesData([...seriesData, item.amount]);
      });
    }
  }, [datePeriod]);
  //console.log("xAxis:" + xAxis);
  // const dataRange = {
  //   //title: "Expense Records in Recent One Week",
  //   //xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   xAxisData: xAxis,
  //   yAxisLabel: `${currency}`,
  //   highlightedZone: [
  //     { start: 1, end: 3 },
  //     { start: 5, end: 6 },
  //   ],
  //   seriesData: seriesData,
  // };
  return (
    <Box>
      {/* <LineChartComponent {...dataRange} /> */}
      <LineChart xAxis={xAxis} seriesData={seriesData} currency={currency} />
    </Box>
  );
}

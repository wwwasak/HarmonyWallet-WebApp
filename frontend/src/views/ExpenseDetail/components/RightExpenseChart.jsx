import { Box, Text } from "@chakra-ui/react";
import PieChartComponent from '../../../modules/charts/PieChartComponent';

export default function RightExpenseChart() {
  const dateRange = {
    datePeriod: ["23/Apr", "24/Apr", "25/Apr", "26/Apr", "26/Apr"],
    series: [500, 600, 100, 500, 1000]
  };
    
  return (
      <PieChartComponent {...dateRange}/>
  );
}

import { Box } from "@chakra-ui/react";
import DefaultIncomeLineChart from "./DefaultIncomeLineChart"

export default function LeftExpenseChart() {
  return (
    <Box m={10} bg="green.200" borderRadius="16px" height="400px" width="50%">
      <DefaultIncomeLineChart />
    </Box>
  );
}
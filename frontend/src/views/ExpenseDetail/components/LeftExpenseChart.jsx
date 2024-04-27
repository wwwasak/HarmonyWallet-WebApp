import { Box, Text } from "@chakra-ui/react";
import DefaultExpenseLineChart from "./DefaultExpenseLineChart"

export default function LeftExpenseChart() {
  return (
    <Box m={10} bg="green.200" borderRadius="16px" height="400px" width="50%">
      <DefaultExpenseLineChart />
    </Box>
  );
}

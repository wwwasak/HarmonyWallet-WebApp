import { Text, Box, Center } from "@chakra-ui/react";
import LineAndPieChartTabs from "./components/LineAndPieChartTabs";

export default function ExpenseDetail() {
  return (
    <Box>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          My Expense Details
        </Text>
      </Center>

      <LineAndPieChartTabs />
    </Box>
  );
}

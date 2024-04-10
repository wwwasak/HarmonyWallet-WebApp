import { Text, Box, Center } from "@chakra-ui/react";
import LineAndPieChartTabs from "./components/LineAndPieChartTabs";

export default function IncomeDetail() {
  return (
    <Box>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          My Income Details
        </Text>
      </Center>

      <LineAndPieChartTabs />
    </Box>
  );
}

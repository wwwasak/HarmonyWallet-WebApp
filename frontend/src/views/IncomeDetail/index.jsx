import { Text, Box, Center, Select, Flex } from "@chakra-ui/react";
import LineAndPieChartTabs from "./components/LineAndPieChartTabs";
import { useState } from "react";

export default function IncomeDetail() {
  const [selectedOption, setSelectedOption] = useState("NZD");

  const handleChange = (event) => setSelectedOption(event.target.value);

  return (
    <Box>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          My Income Details
        </Text>
      </Center>

      <Flex justifyContent="flex-end">
        <Select
          width="auto"
          minWidth="120px"
          maxWidth="200px"
          size="sm"
          placeholder="Choose your currency"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="AUD">AUD</option>
          <option value="NZD">NZD</option>
          <option value="RMB">RMB</option>
        </Select>
      </Flex>

      <LineAndPieChartTabs />
    </Box>
  );
}

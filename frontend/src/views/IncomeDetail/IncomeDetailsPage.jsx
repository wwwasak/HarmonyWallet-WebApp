import { Text, Box, Center, Select, Flex } from "@chakra-ui/react";
import IncomeChartTabs from "./components/IncomeChartTabs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function IncomeDetail() {
  const { currency } = useParams();
  const [selectedOption, setSelectedOption] = useState(currency || "NZD");

  const handleChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedOption(newCurrency);
    window.location.href = `/income-detail/7/${newCurrency}`;
  };

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
          <option value="CNY">CNY</option>
        </Select>
      </Flex>

      <IncomeChartTabs currency={selectedOption} />
    </Box>
  );
}

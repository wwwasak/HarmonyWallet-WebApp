import { Text, Box, Center, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { subDays, subMonths, subYears, format } from "date-fns";

import IncomeChartTabs from "../../modules/commonLayout/CommonRecordChartTabs.jsx";
import IncomeSelector from "../../modules/commonLayout/CurrencySelector.jsx";
import { BaseCurrencyContext } from "../../stores/BaseCurrencyContext.jsx";
import { useNavigation } from "../../stores/RouterNavigationContext.jsx";

const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

const twoWeeksAgo = format(subDays(new Date(), 13), "yyyy-MM-dd");

const oneMonthAgo = format(subMonths(new Date(), 1), "yyyy-MM-dd");

const oneYearAgo = format(subYears(new Date(), 1), "yyyy-MM-dd");

export default function IncomeDetailsPage() {
  const { baseCurrency } = useContext(BaseCurrencyContext);
  const [filteredCurrency, setFilteredCurrency] = useState(baseCurrency);

  const [weeklyIncomes, setWeeklyIncomes] = useState([]);
  const [fortnightlyIncomes, setFortnightlyIncomes] = useState([]);
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [yearlyIncomes, setYearlyIncomes] = useState([]);

  const navigate = useNavigation();

  const getIncomes = async (fromDate, currency) => {
    const url = import.meta.env.VITE_GET_INCOMES_URL;
    const authToken = localStorage.getItem("authToken");
    const body = {
      fromDate: fromDate,
      currency: currency,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const response = await axios.post(url, body, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  const fetchIncomes = async () => {
    try {
      const fetchedWeeklyIncomes = await getIncomes(
        oneWeekAgo,
        filteredCurrency
      );

      setWeeklyIncomes(fetchedWeeklyIncomes);

      const fetchedFortnightlyIncomes = await getIncomes(
        twoWeeksAgo,
        filteredCurrency
      );
      setFortnightlyIncomes(fetchedFortnightlyIncomes);

      const fetchedMonthlyIncomes = await getIncomes(
        oneMonthAgo,
        filteredCurrency
      );
      setMonthlyIncomes(fetchedMonthlyIncomes);

      const fetchedYearlyIncomes = await getIncomes(
        oneYearAgo,
        filteredCurrency
      );
      setYearlyIncomes(fetchedYearlyIncomes);
    } catch (error) {
      console.error("Failed to fetch exchanges:", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [filteredCurrency]);

  useEffect(() => {
    setFilteredCurrency(baseCurrency);
  }, [baseCurrency]);

  return (
    <Box
      bgGradient="linear(to-b, yellow.200, yellow.700)"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      borderRadius={20}
      minH="100vh"
    >
      <Box
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(5px)"
        borderRadius={20}
        minH="100vh"
      >
        <Center>
          <Text fontSize="2xl" fontWeight="bold" m={8}>
            My Income Details
          </Text>
        </Center>

        <Flex justifyContent="space-between">
          <Button onClick={() => navigate("/")} mb={5} ml={10}>
            Back
          </Button>
          <Box mr={10} mb={5}>
            <IncomeSelector
              selected={filteredCurrency}
              onSelect={setFilteredCurrency}
            />
          </Box>
        </Flex>
        <Center mb={10}>
          <Box
            bg="rgba(255, 255, 255, 0.5)"
            backdropFilter="blur(5px)"
            borderRadius={20}
          >
            <IncomeChartTabs
              weeklyIncomes={weeklyIncomes}
              fortnightlyIncomes={fortnightlyIncomes}
              monthlyIncomes={monthlyIncomes}
              yearlyIncomes={yearlyIncomes}
            />
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

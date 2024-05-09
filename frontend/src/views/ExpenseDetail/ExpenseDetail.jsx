import { Text, Box, Center, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { subDays, subMonths, subYears, format } from "date-fns";

import ExpenseChartTabs from "../../modules/commonLayout/CommonRecordChartTabs.jsx";
import ExpenseSelector from "../../modules/commonLayout/CurrencySelector.jsx";
import { BaseCurrencyContext } from "../../stores/BaseCurrencyContext.jsx";
import { useNavigation } from "../../stores/RouterNavigationContext.jsx";

const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

const twoWeeksAgo = format(subDays(new Date(), 13), "yyyy-MM-dd");

const oneMonthAgo = format(subMonths(new Date(), 1), "yyyy-MM-dd");

const oneYearAgo = format(subYears(new Date(), 1), "yyyy-MM-dd");

export default function ExpenseDetail() {
  const { baseCurrency } = useContext(BaseCurrencyContext);
  const [filteredCurrency, setFilteredCurrency] = useState(baseCurrency);

  const [weeklyExpense, setWeeklyExpense] = useState([]);
  const [fortnightlyExpense, setFortnightlyExpense] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [yearlyExpense, setYearlyExpense] = useState([]);

  const navigate = useNavigation();

  const getExpense = async (fromDate, currency) => {
    const url = import.meta.env.VITE_GET_EXPENSES_URL;
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

  const fetchExpense = async () => {
    try {
      const fetchedWeeklyExpense = await getExpense(
        oneWeekAgo,
        filteredCurrency
      );
      setWeeklyExpense(fetchedWeeklyExpense);

      const fetchedFortnightlyExpense = await getExpense(
        twoWeeksAgo,
        filteredCurrency
      );
      setFortnightlyExpense(fetchedFortnightlyExpense);

      const fetchedMonthlyExpense = await getExpense(
        oneMonthAgo,
        filteredCurrency
      );
      setMonthlyExpense(fetchedMonthlyExpense);

      const fetchedYearlyExpense = await getExpense(
        oneYearAgo,
        filteredCurrency
      );
      setYearlyExpense(fetchedYearlyExpense);
    } catch (error) {
      console.error("Failed to fetch exchanges:", error);
    }
  };

  useEffect(() => {
    fetchExpense();
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
            My Expense Details
          </Text>
        </Center>

        <Flex justifyContent="space-between">
          <Button onClick={() => navigate("/")} mb={5} ml={10}>
            Back
          </Button>
          <Box mb={5} mr={10}>
            <ExpenseSelector
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
            <ExpenseChartTabs
              weeklyIncomes={weeklyExpense}
              fortnightlyIncomes={fortnightlyExpense}
              monthlyIncomes={monthlyExpense}
              yearlyIncomes={yearlyExpense}
            />
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

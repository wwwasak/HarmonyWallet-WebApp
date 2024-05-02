import { Text, Box, Center, Select, Flex } from "@chakra-ui/react";
import ExpenseChartTabs from "../../views/IncomeDetail/components/IncomeChartTabs.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import ExpenseSelector from "../../views/IncomeDetail/components/IncomeSelector.jsx";
import { useCurrency } from "../../stores/BaseCurrencyContext.jsx";
import { subDays, subMonths, subYears, format } from "date-fns";

const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

const twoWeeksAgo = format(subDays(new Date(), 13), "yyyy-MM-dd");

const oneMonthAgo = format(subMonths(new Date(), 1), "yyyy-MM-dd");

const oneYearAgo = format(subYears(new Date(), 1), "yyyy-MM-dd");

export default function ExpenseDetail() {
  const { baseCurrency } = useCurrency();
  const [filteredCurrency, setFilteredCurrency] = useState(baseCurrency);

  const [weeklyExpense, setWeeklyExpense] = useState([]);
  const [fortnightlyExpense, setFortnightlyExpense] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [yearlyExpense, setYearlyExpense] = useState([]);

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
      ); //change period here
      //console.log(fetchedWeeklyIncomes);
      setWeeklyExpense(fetchedWeeklyExpense);

      const fetchedFortnightlyExpense = await getExpense(
        twoWeeksAgo,
        filteredCurrency
      ); //change period here
      setFortnightlyExpense(fetchedFortnightlyExpense);

      const fetchedMonthlyExpense = await getExpense(
        oneMonthAgo,
        filteredCurrency
      ); //change period here
      setMonthlyExpense(fetchedMonthlyExpense);

      const fetchedYearlyExpense = await getExpense(
        oneYearAgo,
        filteredCurrency
      ); //change period here
      setYearlyExpense(fetchedYearlyExpense);
    } catch (error) {
      console.error("Failed to fetch exchanges:", error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [filteredCurrency]);

  return (
    <Box>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          My Expense Details
        </Text>
      </Center>

      <Flex justifyContent="flex-end">
        <ExpenseSelector
          selected={filteredCurrency}
          onSelect={setFilteredCurrency}
        />
      </Flex>

      <ExpenseChartTabs
        weeklyIncomes={weeklyExpense}
        fortnightlyIncomes={fortnightlyExpense}
        monthlyIncomes={monthlyExpense}
        yearlyIncomes={yearlyExpense}
      />
    </Box>
  );
}

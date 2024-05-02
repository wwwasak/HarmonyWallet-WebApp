import { Text, Box, Center, Select, Flex } from "@chakra-ui/react";
import IncomeChartTabs from "./components/IncomeChartTabs";
import axios from "axios";
import { useState, useEffect } from "react";
import { DATE_RANGES } from "../../data/DATE_RANGES";
import IncomeSelector from "./components/IncomeSelector";
import { useCurrency } from "../../stores/BaseCurrencyContext.jsx";

export default function IncomeDetailsPage() {
  const { baseCurrency } = useCurrency();
  console.log(baseCurrency);
  const [filteredCurrency, setFilteredCurrency] = useState(baseCurrency);

  const [weeklyIncomes, setWeeklyIncomes] = useState([]);
  const [fortnightlyIncomes, setFortnightlyIncomes] = useState([]);
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [yearlyIncomes, setYearlyIncomes] = useState([]);

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
        DATE_RANGES["weekly"],
        filteredCurrency
      ); //change period here
      setWeeklyIncomes(fetchedWeeklyIncomes);

      const fetchedFortnightlyIncomes = await getIncomes(
        DATE_RANGES["fortnightly"],
        filteredCurrency
      ); //change period here
      setFortnightlyIncomes(fetchedFortnightlyIncomes);

      const fetchedMonthlyIncomes = await getIncomes(
        DATE_RANGES["monthly"],
        filteredCurrency
      ); //change period here
      setMonthlyIncomes(fetchedMonthlyIncomes);

      const fetchedYearlyIncomes = await getIncomes(
        DATE_RANGES["yearly"],
        filteredCurrency
      ); //change period here
      setYearlyIncomes(fetchedYearlyIncomes);
    } catch (error) {
      console.error("Failed to fetch exchanges:", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [filteredCurrency]);

  return (
    <Box>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          My Income Details
        </Text>
      </Center>

      <Flex justifyContent="flex-end">
        <IncomeSelector
          selected={filteredCurrency}
          onSelect={setFilteredCurrency}
        />
      </Flex>

      <IncomeChartTabs
        currency={filteredCurrency}
        weeklyIncomes={weeklyIncomes}
        fortnightlyIncomes={fortnightlyIncomes}
        monthlyIncomes={monthlyIncomes}
        yearlyIncomes={yearlyIncomes}
      />
    </Box>
  );
}

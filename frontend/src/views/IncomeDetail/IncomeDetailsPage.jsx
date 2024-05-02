import { Text, Box, Center, Select, Flex } from "@chakra-ui/react";
import IncomeChartTabs from "./components/IncomeChartTabs";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DATE_RANGES } from "../../data/DATE_RANGES";

export default function IncomeDetailsPage() {
  const { currency } = useParams();
  const [username, setUsername] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [selectedOption, setSelectedOption] = useState(currency || "NZD");

  const [weeklyIncomes, setWeeklyIncomes] = useState([]);
  const [fortnightlyIncomes, setFortnightlyIncomes] = useState([]);
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [yearlyIncomes, setYearlyIncomes] = useState([]);

  const getUserInfo = async () => {
    const url = import.meta.env.VITE_GET_USER_INFO_URL;
    const authToken = localStorage.getItem("authToken");
    const body = {};
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
  const handleChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedOption(newCurrency);
    window.location.href = `/income-detail/7/${newCurrency}`;
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserInfo();
      setUsername(userInfo.username);
      setBaseCurrency(userInfo.base_currency);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const fetchIncomes = async () => {
    try {
      //console.log(baseCurrency);
      const fetchedWeeklyIncomes = await getIncomes(
        DATE_RANGES["weekly"],
        baseCurrency
      ); //change period here
      setWeeklyIncomes(fetchedWeeklyIncomes);

      const fetchedFortnightlyIncomes = await getIncomes(
        DATE_RANGES["fortnightly"],
        baseCurrency
      ); //change period here
      setFortnightlyIncomes(fetchedFortnightlyIncomes);

      const fetchedMonthlyIncomes = await getIncomes(
        DATE_RANGES["monthly"],
        baseCurrency
      ); //change period here
      setMonthlyIncomes(fetchedMonthlyIncomes);

      const fetchedYearlyIncomes = await getIncomes(
        DATE_RANGES["yearly"],
        baseCurrency
      ); //change period here
      setYearlyIncomes(fetchedYearlyIncomes);
      console.log(fetchedYearlyIncomes);
    } catch (error) {
      console.error("Failed to fetch exchanges:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
      if (username.length > 0) {
        await fetchIncomes();
      }
    };

    fetchData();
  }, [username]);
  if (
    !weeklyIncomes.length ||
    !fortnightlyIncomes.length ||
    !monthlyIncomes.length ||
    !yearlyIncomes.length
  ) {
    return <div>Loading...</div>;
  }

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

      <IncomeChartTabs
        currency={selectedOption}
        weeklyIncomes={weeklyIncomes}
        fortnightlyIncomes={fortnightlyIncomes}
        monthlyIncomes={monthlyIncomes}
        yearlyIncomes={yearlyIncomes}
      />
    </Box>
  );
}

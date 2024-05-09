import { Box, Grid, GridItem } from "@chakra-ui/react";
import ProfileCard from "./components/ProfileCard";
import IncomeLineChartCard from "./components/IncomeLineChartCard";
import ExpenseLineChartCard from "./components/ExpenseLineChartCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import FloatWindow from "./components/AddRecord";
import { subDays, format } from "date-fns";

import axios from "axios";
import { useEffect, useState } from "react";
const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

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

const getExchanges = async () => {
  const url = import.meta.env.VITE_GET_EXCHANGES_URL;
  const authToken = localStorage.getItem("authToken");
  const body = {
    fromDate: format(subDays(new Date(), 1000), "yyyy-MM-dd"),
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

const getExpenses = async (fromDate, currency) => {
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

const RecordingPage = () => {
  const [username, setUsername] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("");
  const [exchanges, setExchanges] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUsername(userInfo.username);
        setBaseCurrency(userInfo.base_currency);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        window.location = "/login";
      }
    };

    const fetchExchanges = async () => {
      try {
        const fetchedExchanges = await getExchanges(5);
        setExchanges(fetchedExchanges);
      } catch (error) {
        console.error("Failed to fetch exchanges:", error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const fetchedIncomes = await getIncomes(oneWeekAgo, baseCurrency);
        setIncomes(fetchedIncomes);
      } catch (error) {
        console.error("Failed to fetch incomes:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await getExpenses(oneWeekAgo, baseCurrency);
        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Failed to fetch exchanges:", error);
      }
    };

    const fetchData = async () => {
      await fetchUserInfo();
      if (username.length > 0) {
        await fetchExchanges();
        await fetchIncomes();
        await fetchExpenses();
      }
    };
    fetchData();
  }, [baseCurrency, username]);

  return (
    <>
      <Box
        bgGradient="linear(to-b, gray.200, blue.700)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        borderRadius={20}
        minH="80vh"
      >
        <FloatWindow />
        <Box
          bg="rgba(255, 255, 255, 0.5)"
          backdropFilter="blur(10px)"
          borderRadius={20}
          minH="80vh"
          p={10}
        >
          <Grid
            minH="100vh"
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap={20}
            p={20}
            pr={20}
            pl={20}
            gridTemplateAreas={`
               "profile income income income income"
               "records expense expense expense expense "
             `}
          >
            <GridItem gridArea="profile">
              <ProfileCard username={username} baseCurrency={baseCurrency} />
            </GridItem>
            <GridItem gridArea="income">
              <IncomeLineChartCard
                w="100%"
                h="100%"
                incomes={incomes}
              ></IncomeLineChartCard>
            </GridItem>
            <GridItem gridArea="expense">
              <ExpenseLineChartCard
                w="100%"
                h="100%"
                expenses={expenses}
              ></ExpenseLineChartCard>
            </GridItem>
            <GridItem gridArea="records">
              <RecentRecordsCard
                w="100%"
                h="100%"
                exchanges={exchanges}
              ></RecentRecordsCard>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default RecordingPage;

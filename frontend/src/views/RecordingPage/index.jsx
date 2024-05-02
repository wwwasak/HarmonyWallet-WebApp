import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import ProfileCard from "./components/ProfileCard";
import IncomeLineChartCard from "./components/IncomeLineChartCard";
import ExpenseLineChartCard from "./components/ExpenseLineChartCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import FloatWindow from "./components/FloatWindow";

import axios from "axios";
import { useEffect, useState } from "react";

const data = [
  { Date: "17/04/2024", currency: 2400, amt: 2400 },
  { Date: "16/04/2024", currency: 1398, amt: 2210 },
  { Date: "15/04/2024", currency: 9800, amt: 2290 },
  { Date: "14/04/2024", currency: 3908, amt: 2000 },
  { Date: "13/04/2024", currency: 4800, amt: 2181 },
  { Date: "12/04/2024", currency: 3800, amt: 2500 },
  { Date: "11/04/2024", currency: 4300, amt: 2100 },
];

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

const getExchanges = async (n) => {
  const url = import.meta.env.VITE_GET_EXCHANGES_URL;
  const authToken = localStorage.getItem("authToken");
  const body = {
    day: n,
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
    console.log(response.data);
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
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [username, setUsername] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("");
  const [exchanges, setExchanges] = useState([]);
  const [incomes, setIncomes] = useState([]); //incomes data here
  const [expenses, setExpenses] = useState([]); //expenses data here

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
        const fetchedIncomes = await getIncomes("2024-03-30", baseCurrency); //change period here
        setIncomes(fetchedIncomes);
      } catch (error) {
        console.error("Failed to fetch exchanges:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await getExpenses("2024-03-30", baseCurrency); //change period here
        setIncomes(fetchedExpenses);
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
  }, [username]);

  return (
    <>
      <Box
        bg={bgColor}
        m={5}
        backgroundImage="url('./pictures/IMG_2143.JPG')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Box bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)">
          <Grid
            templateColumns="repeat(12, 1fr)" // Creates three columns
            gap={4} // Sets gap between grid items
            p={8} // Padding around the grid
          >
            <GridItem colSpan={3} ml={45} mr={79}>
              <ProfileCard
                w="100%"
                h="100%"
                username={username}
                baseCurrency={baseCurrency}
              />
            </GridItem>
            <GridItem colSpan={9}>
              <IncomeLineChartCard w="100%" h="100%">
                {/* <Text>Line Chart Data</Text> */}
              </IncomeLineChartCard>
            </GridItem>
            <GridItem colSpan={9}>
              <ExpenseLineChartCard w="100%" h="100%">
                {/* <Text>More Data Here</Text> */}
              </ExpenseLineChartCard>
            </GridItem>
            <GridItem colSpan={3}>
              <RecentRecordsCard w="100%" h="100%" exchanges={exchanges}>
                {/* <Text>Additional Info</Text> */}
              </RecentRecordsCard>
            </GridItem>
            <FloatWindow />
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default RecordingPage;

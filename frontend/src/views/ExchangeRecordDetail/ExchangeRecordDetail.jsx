import {
  Box,
  Text,
  Center,
  Button,
  Flex,
  Spinner,
  Link
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { format, subDays, subMonths } from "date-fns";

import ExchangeRecordChart from "./components/ExchangeRecordChart";

export default function ExchangeRecordDetail() {
  const [weeklyData, setWeeklyData] = useState(null);
  const [fortnightlyData, setFortnightlyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [chartData, setChartData] = useState(weeklyData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRange, setCurrentRange] = useState("one week");

  const oneWeekAgo = useMemo(
    () => format(subDays(new Date(), 6), "yyyy-MM-dd"),
    []
  );
  const twoWeeksAgo = useMemo(
    () => format(subDays(new Date(), 13), "yyyy-MM-dd"),
    []
  );
  const oneMonthAgo = useMemo(
    () => format(subMonths(new Date(), 1), "yyyy-MM-dd"),
    []
  );
  const oneYearAgo = useMemo(
    () => format(subDays(new Date(), 364), "yyyy-MM-dd"),
    []
  );

  useEffect(() => {
    fetchData(oneWeekAgo, setWeeklyData);
  }, [oneWeekAgo]);

  useEffect(() => {
    setChartData(weeklyData);
  }, [weeklyData]);

  const fetchData = async (fromDate, setData) => {
    setIsLoading(true);
    const url = import.meta.env.VITE_GET_EXCHANGES_URL;
    const authToken = localStorage.getItem("authToken");
    const body = {
      fromDate: fromDate,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const response = await axios.post(url, body, config);
      setData(response.data);
      setChartData(response.data); // to fix the bug missing one exchange record always
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickWeekly = () => {
    
    if (weeklyData === null) {
      fetchData(oneWeekAgo, setWeeklyData);
    } else {
      setChartData(weeklyData);
    }
    setCurrentRange("one week");
  };

  const handleClickFortnightly = () => {
    
    if (fortnightlyData === null) {
      fetchData(twoWeeksAgo, setFortnightlyData);
    } else {
      setChartData(fortnightlyData);
    }
    setCurrentRange("two weeks");
  };

  const handleClickMonthly = () => {
    
    if (monthlyData === null) {
      fetchData(oneMonthAgo, setMonthlyData);
    } else {
      setChartData(monthlyData);
    }
    setCurrentRange("one month");
  };

  const handleClickYearly = () => {
    
    if (yearlyData === null) {
      fetchData(oneYearAgo, setYearlyData);
    } else {
      setChartData(yearlyData);
    }
    setCurrentRange("one year");
  };

  return (
    <Box
      backgroundImage="url('./pictures/IMG_2144.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      borderRadius={20}
      minH="100vh"
    >
      <Box
        p={5}
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(5px)"
        borderRadius={20}
        minH="100vh"
      >
        <Flex>
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </Flex>

        <Center>
          <Text fontSize="2xl" fontWeight="bold" m={5}>
            My Exchange Records
          </Text>
        </Center>

        <Center textAlign="center">
          <Flex justifyContent="space-around" m={5} minW={800}>
            <Button
              onClick={handleClickWeekly}
              colorScheme={currentRange === "one week" ? "blue" : "gray"}
            >
              Recent 1 Week
            </Button>
            <Button
              onClick={handleClickFortnightly}
              colorScheme={currentRange === "two weeks" ? "blue" : "gray"}
            >
              Recent 2 Weeks
            </Button>
            <Button
              onClick={handleClickMonthly}
              colorScheme={currentRange === "one month" ? "blue" : "gray"}
            >
              Recent 1 Month
            </Button>
            <Button
              onClick={handleClickYearly}
              colorScheme={currentRange === "one year" ? "blue" : "gray"}
            >
              Recent 1 Year
            </Button>
          </Flex>
        </Center>

        {isLoading ? (
          <Center height="400px">
            <Spinner size="xl" />
          </Center>
        ) : (
          <Center>
            <Box
              bg="rgba(255, 255, 255, 0.5)"
              backdropFilter="blur(10px)"
              borderRadius={20}
              maxH={800}
              maxW={1200}
            >
              <ExchangeRecordChart chartData={chartData} />
            </Box>
          </Center>
        )}
      </Box>
    </Box>
  );
}

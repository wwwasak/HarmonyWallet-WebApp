import {
  Box,
  Text,
  Center,
  Button,
  Flex,
  Spinner,
  Link,
} from "@chakra-ui/react";
import ExchangeRecordChart from "./components/ExchangeRecordChart";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { format, subDays, subMonths } from "date-fns";

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
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickWeekly = () => {
    console.log(weeklyData);
    if (weeklyData === null) {
      fetchData(oneWeekAgo, setWeeklyData);
    } else {
      setChartData(weeklyData);
    }
    setCurrentRange("one week");
  };

  const handleClickFortnightly = () => {
    console.log(fortnightlyData);
    if (fortnightlyData === null) {
      fetchData(twoWeeksAgo, setFortnightlyData);
    } else {
      setChartData(fortnightlyData);
    }
    setCurrentRange("two weeks");
  };

  const handleClickMonthly = () => {
    console.log(monthlyData);
    if (monthlyData === null) {
      fetchData(oneMonthAgo, setMonthlyData);
    } else {
      setChartData(monthlyData);
    }
    setCurrentRange("one month");
  };

  const handleClickYearly = () => {
    console.log(yearlyData);
    if (yearlyData === null) {
      fetchData(oneYearAgo, setYearlyData);
    } else {
      setChartData(yearlyData);
    }
    setCurrentRange("one year");
  };

  return (
    <>
      <Box p={5}>
        <Center>
          <Text fontSize="2xl" fontWeight="bold">
            Exchange Record
          </Text>
        </Center>
        <Flex>
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </Flex>

        <Box>
          <Flex justifyContent="space-around" m={5}>
            <Button
              onClick={handleClickWeekly}
              colorScheme={currentRange === "one week" ? "blue" : "gray"}
            >
              One Week
            </Button>
            <Button
              onClick={handleClickFortnightly}
              colorScheme={currentRange === "two weeks" ? "blue" : "gray"}
            >
              Two Weeks
            </Button>
            <Button
              onClick={handleClickMonthly}
              colorScheme={currentRange === "one month" ? "blue" : "gray"}
            >
              One Month
            </Button>
            <Button
              onClick={handleClickYearly}
              colorScheme={currentRange === "one year" ? "blue" : "gray"}
            >
              One Year
            </Button>
          </Flex>
        </Box>

        {isLoading ? (
          <Center height="400px">
            <Spinner size="xl" />
          </Center>
        ) : (
          <Center>
            <Box bg="red.100" maxH={800} maxW={1200}>
              <ExchangeRecordChart chartData={chartData} />
            </Box>
          </Center>
        )}
      </Box>
    </>
  );
}

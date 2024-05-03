import { Box, Text, Center, Button, Flex } from "@chakra-ui/react";
import ExchangeRecordChart from "./components/ExchangeRecordChart";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, subDays, subMonths } from "date-fns";

const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");
const twoWeeksAgo = format(subDays(new Date(), 13), "yyyy-MM-dd");
const oneMonthAgo = format(subMonths(new Date(), 1), "yyyy-MM-dd");
const oneYearAgo = format(subDays(new Date(), 364), "yyyy-MM-dd");

export default function ExchangeRecordDetail() {
  const [weeklyData, setWeeklyData] = useState(null);
  const [fortnightlyData, setFortnightlyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);

  useEffect(() => {
    fetchData(oneWeekAgo, setWeeklyData);
  }, []);

  const fetchData = async (fromDate, setData) => {
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
    }
  };

  const handleClickWeekly = () => {
    if (weeklyData === null) {
      fetchData(oneWeekAgo, setWeeklyData);
    }
  };

  const handleClickFortnightly = () => {
    if (fortnightlyData === null) {
      fetchData(twoWeeksAgo, setFortnightlyData);
    }
  };

  const handleClickMonthly = () => {
    if (monthlyData === null) {
      fetchData(oneMonthAgo, setMonthlyData);
    }
  };

  const handleClickYearly = () => {
    if (yearlyData === null) {
      fetchData(oneYearAgo, setYearlyData);
    }
  };

  return (
    <>
      <Box p={5}>
        <Center>
          <Text fontSize="2xl" fontWeight="bold">
            Exchange Record
          </Text>
        </Center>

        <Box>
          <Flex justifyContent="space-around" m={5}>
            <Button onClick={handleClickWeekly}>One Week</Button>
            <Button onClick={handleClickFortnightly}>Two Weeks</Button>
            <Button onClick={handleClickMonthly}>One Month</Button>
            <Button onClick={handleClickYearly}>One Year</Button>
          </Flex>
        </Box>

        <Box bg="green.200" minH={400} minW={500}>
          <ExchangeRecordChart
            weeklyData={weeklyData}
            fortnightlyData={fortnightlyData}
            monthlyData={monthlyData}
            yearlyData={yearlyData}
          />
        </Box>
      </Box>
    </>
  );
}

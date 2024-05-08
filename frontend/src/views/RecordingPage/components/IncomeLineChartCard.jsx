import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Link,
  useColorModeValue,
  Center,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { format, parseISO } from "date-fns";

import { BaseCurrencyContext } from "../../../stores/BaseCurrencyContext.jsx"
import { useNavigation } from "../../../stores/RouterNavigationContext";

const IncomeLineChartCard = ({ incomes = [] }) => {
  const navigate = useNavigation();
  const linkColor = useColorModeValue("blue.500", "blue.200");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formattedData, setFormattedData] = useState([]);
  const { baseCurrency } = useContext(BaseCurrencyContext);
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);

  useEffect(() => {
    const dateAmountMap = {};
    incomes.forEach(item => {
      const date = format(parseISO(item.date), "yyyy-MM-dd");
      const amount = item.convertedAmount || item.amount; 
      dateAmountMap[date] = (dateAmountMap[date] || 0) + amount;
    });

    const sortedDates = Object.keys(dateAmountMap).sort();
    const amounts = sortedDates.map(date => parseFloat(dateAmountMap[date]).toFixed(2));
    setFormattedData({ dates: sortedDates, amounts });

  }, [incomes, selectedCurrency]);

  
  const handleCardClick = () => {
    navigate("/income");
  };

  const handleSelectorClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent elements
  };

  const getOption = () => {
//  // Aggregate income by day
//   const incomeByDate = incomes.reduce((acc, item) => {
//     // Parse the date from each item
//     const date = format(new Date(item.date), "yyyy-MM-dd");
//     if (acc[date]) {
//       acc[date] += item.amount; // Sum amounts for the same date
//     } else {
//       acc[date] = item.amount; // Initialize if not already present
//     }
//     return acc;
//   }, {});

//   // Convert the aggregated object into an array and sort by date
//   const sortedIncomeData = Object.entries(incomeByDate)
//     .map(([date, amount]) => ({ date, amount }))
//     .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
  
    return {
      title: {
        text: "Income Records in Recent One Week",
        left: "center",
        textStyle: {
          color: "#333",
          fontWeight: "bold",
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: formattedData.dates, // Use sorted dates
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#57606f",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} $",
        },
        axisLine: {
          lineStyle: {
            color: "#57606f",
          },
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#ced6e0",
          },
        },
      },
      series: [
        {
          name: "Income",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            width: 3,
            color: "#1e90ff",
            shadowColor: "rgba(30, 144, 255, 0.4)",
            shadowBlur: 10,
            shadowOffsetY: 10,
          },
          itemStyle: {
            color: "#1e90ff",
            borderColor: "#1e90ff",
            borderWidth: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(30, 144, 255, 0.4)",
              },
              {
                offset: 1,
                color: "rgba(30, 144, 255, 0.1)",
              },
            ]),
          },
          data: formattedData.amounts,
        },
      ],
    };
  };
  
  return (
    <Card onClick={handleCardClick} cursor="pointer">
      <CardHeader>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          onClick={handleSelectorClick}
          mb={5}
        >
          <Heading size="sm">Income Records</Heading>
          <Link
            as={RouterLink}
            to="/income"
            color={linkColor}
            textDecoration="underline"
            _hover={{ textDecoration: "none" }}
          >
            More
          </Link>
        </Flex>
        <Divider />
      </CardHeader>
      <CardBody>
      <Box p={4} boxShadow="base" rounded="md" bg="white" minH="330px">
          {/* {incomes.length > 0 ? (
            <ReactECharts option={getOption(incomes, filteredCurrency)} style={{ height: "300px" }} />
          ) : (
            <Center height="100%">
              No data available within 7 days
            </Center>
          )} */}
           {loading ? (
            <Spinner />
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : incomes.length > 0 ?(
            <ReactECharts option={getOption(incomes, selectedCurrency)} style={{ height: "300px" }} />
          ): (
            <Center height="100%"> 
            <Alert variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
              <AlertIcon boxSize="40px" mr={0} />
              <Text mt={100} fontSize="lg" style={{ color: "rgba(128, 128, 128, 0.75)" }} fontStyle="italic">
              You have no income records in recent 7 days yet.<br/>
              Click on the '+' icon at the bottom right of the page to start recording!
              </Text>
            </Alert>
          </Center>
        )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default IncomeLineChartCard;

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
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { format, parseISO } from "date-fns";

import { BaseCurrencyContext } from "../../../stores/BaseCurrencyContext.jsx"
import { useNavigation } from "../../../stores/RouterNavigationContext";

const ExpenseLineChartCard = ({ expenses = [] }) => {
  const navigate = useNavigation();
  const linkColor = useColorModeValue("blue.500", "blue.200");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formattedData, setFormattedData] = useState([]);
  const { baseCurrency } = useContext(BaseCurrencyContext);
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);

  useEffect(() => {
    const dateAmountMap = {};
    expenses.forEach((item) => {
      const date = format(parseISO(item.date), "yyyy-MM-dd");
      const amount = item.convertedAmount || item.amount;
      dateAmountMap[date] = (dateAmountMap[date] || 0) + amount;
    });

    const sortedDates = Object.keys(dateAmountMap).sort();
    const amounts = sortedDates.map((date) =>
      parseFloat(dateAmountMap[date]).toFixed(2)
    );
    setFormattedData({ dates: sortedDates, amounts });
  }, [expenses, selectedCurrency]);

  const handleCardClick = () => {
    navigate("/expense");
  };

  const handleSelectorClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent elements
  };

  const getOption = () => {
    return {
      title: {
        text: "Expense Records in Recent One Week",
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
          name: "Expense",
          type: "line",
          smooth: false,
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
          data: formattedData.amounts, // Use aggregated and sorted amounts
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
          <Heading size="sm">Expense Records</Heading>
          <Link
            as={RouterLink}
            to="/expense"
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
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : expenses.length > 0 ? (
            <ReactECharts
              option={getOption(expenses, selectedCurrency)}
              style={{ height: "300px" }}
            />
          ) : (
            <Center height="100%">
              <Alert
                bg="white"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                {/* <AlertIcon boxSize="40px" mr={0} /> */}
                <Text
                  mt={100}
                  fontSize="lg"
                  style={{ color: "rgba(128, 128, 128, 0.75)" }}
                  fontStyle="italic"
                >
                  You have no expense records in recent 7 days yet.
                  <br />
                  Click on the '+' icon at the bottom right of the page to start
                  recording!
                </Text>
              </Alert>
            </Center>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default ExpenseLineChartCard;

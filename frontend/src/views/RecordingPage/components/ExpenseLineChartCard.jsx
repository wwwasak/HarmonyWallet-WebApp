import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IncomeSelector from "../../IncomeDetail/components/IncomeSelector.jsx";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import axios from "axios";
import { format, subDays } from "date-fns";
import { useCurrency } from "../../../stores/BaseCurrencyContext.jsx";

const ExpenseLineChartCard = () => {
  const { baseCurrency } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);
  const [expenseData, setExpenseData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_GET_EXPENSES_URL;
  const linkColor = useColorModeValue("blue.500", "blue.200");
  useEffect(() => {
    if (!selectedCurrency) return;
    const fromDate = format(subDays(new Date(), 7), "yyyy-MM-dd");
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          url,
          {
            fromDate: fromDate,
            currency: selectedCurrency,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.status === 200) {
          const aggregatedData = aggregateDataByDay(response.data);
          setExpenseData(aggregatedData);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCurrency]);

  // aggregate data by day
  const aggregateDataByDay = (data) => {
    const dataByDay = {};
    data.forEach((item) => {
      const date = format(new Date(item.date), "yyyy-MM-dd");
      if (dataByDay[date]) {
        dataByDay[date] += item.amount;
      } else {
        dataByDay[date] = item.amount;
      }
    });
    // Create an array from the object, then sort it by date
    return Object.entries(dataByDay)
      .map(([date, amount]) => ({ Date: date, amount }))
      .sort((a, b) => new Date(a.Date) - new Date(b.Date)); // Sorting by date
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleCardClick = () => {
    navigate("/expense");
  };

  const handleSelectorClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent elements
  };

  const getOption = () => ({
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
      data: expenseData.map((item) => item.Date),
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
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    series: [
      {
        name: "Expense",
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
        data: expenseData.map((item) => item.amount),
      },
    ],
  });

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
          <IncomeSelector
            selected={selectedCurrency}
            onSelect={handleCurrencyChange}
          />
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
        <Box p={4} boxShadow="base" rounded="md" bg="white">
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : (
            <ReactECharts option={getOption()} style={{ height: "300px" }} />
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default ExpenseLineChartCard;

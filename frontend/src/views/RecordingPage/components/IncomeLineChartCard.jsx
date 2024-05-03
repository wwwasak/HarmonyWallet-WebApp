import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SignupCurrenciesSelector from "../../SignUp/components/SignupCurrenciesSelector";
import { incomeData } from "../../../data/IncomeData.js";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const IncomeLineChartCard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/income");
  };

  const filteredData = selectedCurrency
    ? incomeData.filter((item) => item.currency === selectedCurrency)
    : incomeData;

    const getOption = () => ({
      title: {
        text: 'Income Records in Recent One Week',
        left: 'center',
        textStyle: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: filteredData.map(item => item.Date),
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#57606f'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} $'
        },
        axisLine: {
          lineStyle: {
            color: '#57606f'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ced6e0'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [{
        name: 'Expense',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        showSymbol: false,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 10,
          shadowOffsetY: 10
        },
        itemStyle: {
          color: '#10ac84',
          borderColor: '#10ac84',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(16, 172, 132, 0.4)'
          }, {
            offset: 1,
            color: 'rgba(16, 172, 132, 0.1)'
          }])
        },
        data: filteredData.map(item => item.amount)
      }]
    });
    
  return (
    <Card onClick={handleCardClick} cursor="pointer">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <Heading size="sm" textTransform="uppercase">Income Records</Heading>
          <SignupCurrenciesSelector handleChange={handleCurrencyChange} setIsSelected={() => {}} />
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box p={4} boxShadow="base" rounded="md" bg="white" width="100%">
          <ReactECharts option={getOption()} style={{ height: '300px' }} />
        </Box>
      </CardBody>
    </Card>
  );
};

export default IncomeLineChartCard;
